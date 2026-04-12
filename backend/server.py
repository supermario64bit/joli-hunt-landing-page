from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# All other imports below load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import os
import logging
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import secrets
from bson import ObjectId

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# JWT Configuration
JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

# Password hashing functions
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# JWT token functions
def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15),
        "type": "access"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

# Auth helper - get current user
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Brute force protection helper
async def check_brute_force(identifier: str):
    """Check if user is locked out due to too many failed attempts"""
    attempt_doc = await db.login_attempts.find_one({"identifier": identifier})
    if attempt_doc:
        failed_count = attempt_doc.get("failed_count", 0)
        locked_until = attempt_doc.get("locked_until")
        if locked_until and locked_until > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Too many failed attempts. Please try again later.")
        if failed_count >= 5:
            # Lock for 15 minutes
            await db.login_attempts.update_one(
                {"identifier": identifier},
                {"$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}}
            )
            raise HTTPException(status_code=429, detail="Too many failed attempts. Account locked for 15 minutes.")

async def record_failed_login(identifier: str):
    """Record a failed login attempt"""
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {
            "$inc": {"failed_count": 1},
            "$set": {"last_attempt": datetime.now(timezone.utc)}
        },
        upsert=True
    )

async def clear_failed_attempts(identifier: str):
    """Clear failed login attempts on successful login"""
    await db.login_attempts.delete_one({"identifier": identifier})

# ============ PYDANTIC MODELS ============

# User Models
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    role: Optional[str] = None
    password: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    created_at: datetime

# Auth Models
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

# Blog Models
class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    author: str
    readTime: Optional[str] = None
    image: Optional[str] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    readTime: Optional[str] = None
    image: Optional[str] = None

class BlogPostResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    category: str
    author: str
    readTime: Optional[str] = None
    image: Optional[str] = None
    date: str
    created_at: datetime

# Newsletter Models
class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr

# ============ AUTHENTICATION ROUTES ============

@api_router.post("/auth/register")
async def register(data: RegisterRequest, response: Response):
    """Register a new user"""
    # Normalize email
    email = data.email.lower()
    
    # Check if user exists
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash password
    password_hash = hash_password(data.password)
    
    # Create user
    user_doc = {
        "email": email,
        "name": data.name,
        "password_hash": password_hash,
        "role": "user",
        "created_at": datetime.now(timezone.utc)
    }
    
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Create tokens
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=900,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,
        path="/"
    )
    
    return {
        "id": user_id,
        "email": email,
        "name": data.name,
        "role": "user",
        "created_at": user_doc["created_at"]
    }

@api_router.post("/auth/login")
async def login(data: LoginRequest, request: Request, response: Response):
    """Login user"""
    # Normalize email
    email = data.email.lower()
    
    # Get IP for brute force protection
    client_ip = request.client.host if request.client else "unknown"
    identifier = f"{client_ip}:{email}"
    
    # Check brute force
    await check_brute_force(identifier)
    
    # Find user
    user = await db.users.find_one({"email": email})
    if not user:
        await record_failed_login(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Verify password
    if not verify_password(data.password, user["password_hash"]):
        await record_failed_login(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Clear failed attempts
    await clear_failed_attempts(identifier)
    
    user_id = str(user["_id"])
    
    # Create tokens
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=900,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,
        path="/"
    )
    
    return {
        "id": user_id,
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "created_at": user["created_at"]
    }

@api_router.post("/auth/logout")
async def logout(response: Response, current_user: dict = Depends(get_current_user)):
    """Logout user"""
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user"""
    return current_user

@api_router.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    """Refresh access token"""
    refresh = request.cookies.get("refresh_token")
    if not refresh:
        raise HTTPException(status_code=401, detail="Refresh token not found")
    
    try:
        payload = jwt.decode(refresh, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        # Create new access token
        access_token = create_access_token(str(user["_id"]), user["email"])
        
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
            path="/"
        )
        
        return {"message": "Token refreshed"}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

@api_router.post("/auth/forgot-password")
async def forgot_password(data: ForgotPasswordRequest):
    """Request password reset"""
    email = data.email.lower()
    user = await db.users.find_one({"email": email})
    
    if not user:
        # Don't reveal if email exists
        return {"message": "If the email exists, a reset link will be sent"}
    
    # Generate reset token
    reset_token = secrets.token_urlsafe(32)
    
    # Store in database
    await db.password_reset_tokens.insert_one({
        "token": reset_token,
        "user_id": user["_id"],
        "created_at": datetime.now(timezone.utc),
        "expires_at": datetime.now(timezone.utc) + timedelta(hours=1),
        "used": False
    })
    
    # Log reset link (in production, send email)
    reset_link = f"https://application-hub-29.preview.emergentagent.com/reset-password?token={reset_token}"
    logging.info(f"Password reset link for {email}: {reset_link}")
    
    return {"message": "If the email exists, a reset link will be sent"}

@api_router.post("/auth/reset-password")
async def reset_password(data: ResetPasswordRequest):
    """Reset password with token"""
    # Find token
    token_doc = await db.password_reset_tokens.find_one({"token": data.token, "used": False})
    
    if not token_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    # Check expiry
    if token_doc["expires_at"] < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Reset token has expired")
    
    # Update password
    new_hash = hash_password(data.new_password)
    await db.users.update_one(
        {"_id": token_doc["user_id"]},
        {"$set": {"password_hash": new_hash}}
    )
    
    # Mark token as used
    await db.password_reset_tokens.update_one(
        {"_id": token_doc["_id"]},
        {"$set": {"used": True}}
    )
    
    return {"message": "Password reset successfully"}

# ============ BLOG ROUTES ============

@api_router.get("/blog/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(category: Optional[str] = None, search: Optional[str] = None):
    """Get all blog posts with optional filters"""
    query = {}
    
    if category:
        query["category"] = category
    
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"excerpt": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}}
        ]
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    # Convert datetime objects
    for post in posts:
        if isinstance(post.get('created_at'), datetime):
            pass  # Already datetime object
        elif isinstance(post.get('created_at'), str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return posts

@api_router.get("/blog/posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(post_id: str):
    """Get a single blog post"""
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Convert datetime if needed
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return post

@api_router.post("/blog/posts", response_model=BlogPostResponse)
async def create_blog_post(post: BlogPostCreate, current_user: dict = Depends(get_current_user)):
    """Create a new blog post (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create blog posts")
    
    # Create blog post
    post_doc = {
        "id": str(uuid.uuid4()),
        "title": post.title,
        "excerpt": post.excerpt,
        "content": post.content,
        "category": post.category,
        "author": post.author,
        "readTime": post.readTime,
        "image": post.image,
        "date": datetime.now(timezone.utc).strftime("%B %d, %Y"),
        "created_at": datetime.now(timezone.utc)
    }
    
    await db.blog_posts.insert_one(post_doc)
    
    return post_doc

@api_router.put("/blog/posts/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(post_id: str, post: BlogPostUpdate, current_user: dict = Depends(get_current_user)):
    """Update a blog post (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can update blog posts")
    
    # Check if post exists
    existing = await db.blog_posts.find_one({"id": post_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in post.model_dump().items() if v is not None}
    
    if update_data:
        await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    
    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    
    # Convert datetime if needed
    if isinstance(updated_post.get('created_at'), str):
        updated_post['created_at'] = datetime.fromisoformat(updated_post['created_at'])
    
    return updated_post

@api_router.delete("/blog/posts/{post_id}")
async def delete_blog_post(post_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a blog post (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can delete blog posts")
    
    result = await db.blog_posts.delete_one({"id": post_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    return {"message": "Blog post deleted successfully"}

# ============ USER MANAGEMENT ROUTES (Admin Only) ============

@api_router.get("/users", response_model=List[UserResponse])
async def get_users(current_user: dict = Depends(get_current_user)):
    """Get all users (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can view users")
    
    users = await db.users.find({}, {"_id": 0, "password_hash": 0}).to_list(1000)
    
    # Add id field from _id
    result = []
    async for user in db.users.find({}):
        result.append({
            "id": str(user["_id"]),
            "email": user["email"],
            "name": user["name"],
            "role": user["role"],
            "created_at": user["created_at"]
        })
    
    return result

@api_router.post("/users", response_model=UserResponse)
async def create_user(user: UserCreate, current_user: dict = Depends(get_current_user)):
    """Create a new user (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can create users")
    
    # Check if email exists
    email = user.email.lower()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Hash password
    password_hash = hash_password(user.password)
    
    # Create user
    user_doc = {
        "email": email,
        "name": user.name,
        "password_hash": password_hash,
        "role": user.role,
        "created_at": datetime.now(timezone.utc)
    }
    
    result = await db.users.insert_one(user_doc)
    
    return {
        "id": str(result.inserted_id),
        "email": email,
        "name": user.name,
        "role": user.role,
        "created_at": user_doc["created_at"]
    }

@api_router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, user: UserUpdate, current_user: dict = Depends(get_current_user)):
    """Update a user (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can update users")
    
    # Check if user exists
    existing = await db.users.find_one({"_id": ObjectId(user_id)})
    if not existing:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Build update data
    update_data = {}
    if user.email:
        update_data["email"] = user.email.lower()
    if user.name:
        update_data["name"] = user.name
    if user.role:
        update_data["role"] = user.role
    if user.password:
        update_data["password_hash"] = hash_password(user.password)
    
    if update_data:
        await db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
    
    updated_user = await db.users.find_one({"_id": ObjectId(user_id)})
    
    return {
        "id": str(updated_user["_id"]),
        "email": updated_user["email"],
        "name": updated_user["name"],
        "role": updated_user["role"],
        "created_at": updated_user["created_at"]
    }

@api_router.delete("/users/{user_id}")
async def delete_user(user_id: str, current_user: dict = Depends(get_current_user)):
    """Delete a user (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can delete users")
    
    # Prevent deleting self
    if current_user.get("id") == user_id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
    
    result = await db.users.delete_one({"_id": ObjectId(user_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}

# ============ NEWSLETTER ROUTES ============

@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    """Subscribe to newsletter - saves email to database"""
    # Check if email already exists
    existing = await db.newsletter_subscriptions.find_one({"email": subscription.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    # Create subscription
    subscription_obj = NewsletterSubscription(email=subscription.email)
    doc = subscription_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscriptions.insert_one(doc)
    return subscription_obj

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscription])
async def get_subscribers(current_user: dict = Depends(get_current_user)):
    """Get all newsletter subscribers (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Only admins can view subscribers")
    
    subscribers = await db.newsletter_subscriptions.find({"is_active": True}, {"_id": 0}).to_list(10000)
    
    # Convert ISO string timestamps back to datetime objects
    for sub in subscribers:
        if isinstance(sub.get('subscribed_at'), str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    
    return subscribers

# ============ TEST ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "JoliHunt API v1.0"}

# ============ STARTUP EVENTS ============

@app.on_event("startup")
async def startup_event():
    """Initialize database indexes and seed admin"""
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.password_reset_tokens.create_index("expires_at", expireAfterSeconds=0)
    await db.login_attempts.create_index("identifier")
    
    # Seed admin user
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@jolihunt.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "JoliHunt2026!")
    
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hashed,
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc)
        })
        logging.info(f"Admin user created: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        # Update password if changed in .env
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logging.info(f"Admin password updated: {admin_email}")
    
    # Write test credentials
    credentials_content = f"""# JoliHunt Test Credentials

## Admin Account
- **Email**: {admin_email}
- **Password**: {admin_password}
- **Role**: admin

## Auth Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

## Blog Endpoints (Admin only)
- GET /api/blog/posts
- GET /api/blog/posts/{{post_id}}
- POST /api/blog/posts
- PUT /api/blog/posts/{{post_id}}
- DELETE /api/blog/posts/{{post_id}}

## User Management Endpoints (Admin only)
- GET /api/users
- POST /api/users
- PUT /api/users/{{user_id}}
- DELETE /api/users/{{user_id}}

## Newsletter Endpoints
- POST /api/newsletter/subscribe
- GET /api/newsletter/subscribers (Admin only)
"""
    
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(credentials_content)
    
    logging.info("Test credentials saved to /app/memory/test_credentials.md")

# Include the router in the main app
app.include_router(api_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
