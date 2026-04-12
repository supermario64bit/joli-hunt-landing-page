"""
JoliHunt API Backend Tests
Tests for: Authentication, Blog Management, User Management, Newsletter
"""
import pytest
import requests
import os
import uuid

# Get API URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials from test_credentials.md
ADMIN_EMAIL = "admin@jolihunt.com"
ADMIN_PASSWORD = "JoliHunt2026!"


class TestHealthCheck:
    """Basic API health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API Root: {data}")


class TestAuthentication:
    """Authentication flow tests"""
    
    def test_login_success(self):
        """Test successful admin login"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "id" in data
        assert "email" in data
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "name" in data
        print(f"Login successful: {data['email']}, role: {data['role']}")
        
        # Verify cookies are set
        assert "access_token" in session.cookies or "access_token" in response.cookies
        print("Cookies set correctly")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "wrong@example.com", "password": "wrongpassword"}
        )
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        print(f"Invalid login correctly rejected: {data['detail']}")
    
    def test_auth_me_authenticated(self):
        """Test /auth/me with valid session"""
        session = requests.Session()
        # Login first
        login_response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert login_response.status_code == 200
        
        # Get current user
        me_response = session.get(f"{BASE_URL}/api/auth/me")
        assert me_response.status_code == 200
        data = me_response.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        print(f"Auth me successful: {data['email']}")
    
    def test_auth_me_unauthenticated(self):
        """Test /auth/me without authentication"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("Unauthenticated /auth/me correctly rejected")
    
    def test_logout(self):
        """Test logout functionality"""
        session = requests.Session()
        # Login first
        login_response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert login_response.status_code == 200
        
        # Logout
        logout_response = session.post(f"{BASE_URL}/api/auth/logout")
        assert logout_response.status_code == 200
        data = logout_response.json()
        assert "message" in data
        print(f"Logout successful: {data['message']}")
    
    def test_register_new_user(self):
        """Test user registration"""
        unique_email = f"TEST_user_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": unique_email,
                "password": "TestPass123!",
                "name": "Test User"
            }
        )
        assert response.status_code == 200, f"Registration failed: {response.text}"
        data = response.json()
        assert data["email"] == unique_email.lower()
        assert data["role"] == "user"
        print(f"Registration successful: {data['email']}")
    
    def test_register_duplicate_email(self):
        """Test registration with existing email"""
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": ADMIN_EMAIL,
                "password": "TestPass123!",
                "name": "Duplicate User"
            }
        )
        assert response.status_code == 400
        data = response.json()
        assert "already registered" in data["detail"].lower()
        print(f"Duplicate email correctly rejected: {data['detail']}")


class TestBlogPosts:
    """Blog post CRUD tests"""
    
    @pytest.fixture
    def admin_session(self):
        """Create authenticated admin session"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        return session
    
    def test_get_blog_posts_public(self):
        """Test getting blog posts (public endpoint)"""
        response = requests.get(f"{BASE_URL}/api/blog/posts")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Got {len(data)} blog posts")
    
    def test_create_blog_post_admin(self, admin_session):
        """Test creating blog post as admin"""
        post_data = {
            "title": f"TEST_Blog Post {uuid.uuid4().hex[:8]}",
            "excerpt": "This is a test excerpt for the blog post",
            "content": "Full content of the test blog post goes here.",
            "category": "Job Search Tips",
            "author": "Test Admin",
            "readTime": "5 min read"
        }
        
        response = admin_session.post(f"{BASE_URL}/api/blog/posts", json=post_data)
        assert response.status_code == 200, f"Create blog failed: {response.text}"
        data = response.json()
        
        # Verify response
        assert data["title"] == post_data["title"]
        assert data["excerpt"] == post_data["excerpt"]
        assert data["category"] == post_data["category"]
        assert "id" in data
        assert "date" in data
        print(f"Blog post created: {data['id']}")
        
        # Verify persistence with GET
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{data['id']}")
        assert get_response.status_code == 200
        fetched = get_response.json()
        assert fetched["title"] == post_data["title"]
        print(f"Blog post verified in database")
        
        return data["id"]
    
    def test_create_blog_post_unauthorized(self):
        """Test creating blog post without auth"""
        post_data = {
            "title": "Unauthorized Post",
            "excerpt": "Should fail",
            "content": "Content",
            "category": "Job Search Tips",
            "author": "Anonymous"
        }
        response = requests.post(f"{BASE_URL}/api/blog/posts", json=post_data)
        assert response.status_code == 401
        print("Unauthorized blog creation correctly rejected")
    
    def test_get_single_blog_post(self, admin_session):
        """Test getting a single blog post"""
        # First create a post
        post_data = {
            "title": f"TEST_Single Post {uuid.uuid4().hex[:8]}",
            "excerpt": "Test excerpt",
            "content": "Test content",
            "category": "Productivity",
            "author": "Test Author"
        }
        create_response = admin_session.post(f"{BASE_URL}/api/blog/posts", json=post_data)
        assert create_response.status_code == 200
        post_id = create_response.json()["id"]
        
        # Get the post
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_response.status_code == 200
        data = get_response.json()
        assert data["title"] == post_data["title"]
        print(f"Single blog post retrieved: {data['title']}")
    
    def test_update_blog_post(self, admin_session):
        """Test updating a blog post"""
        # Create a post first
        post_data = {
            "title": f"TEST_Update Post {uuid.uuid4().hex[:8]}",
            "excerpt": "Original excerpt",
            "content": "Original content",
            "category": "Interview Tips",
            "author": "Original Author"
        }
        create_response = admin_session.post(f"{BASE_URL}/api/blog/posts", json=post_data)
        assert create_response.status_code == 200
        post_id = create_response.json()["id"]
        
        # Update the post
        update_data = {"title": "Updated Title", "excerpt": "Updated excerpt"}
        update_response = admin_session.put(f"{BASE_URL}/api/blog/posts/{post_id}", json=update_data)
        assert update_response.status_code == 200
        updated = update_response.json()
        assert updated["title"] == "Updated Title"
        assert updated["excerpt"] == "Updated excerpt"
        
        # Verify persistence
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_response.status_code == 200
        fetched = get_response.json()
        assert fetched["title"] == "Updated Title"
        print(f"Blog post updated and verified")
    
    def test_delete_blog_post(self, admin_session):
        """Test deleting a blog post"""
        # Create a post first
        post_data = {
            "title": f"TEST_Delete Post {uuid.uuid4().hex[:8]}",
            "excerpt": "To be deleted",
            "content": "Delete me",
            "category": "Career Growth",
            "author": "Delete Author"
        }
        create_response = admin_session.post(f"{BASE_URL}/api/blog/posts", json=post_data)
        assert create_response.status_code == 200
        post_id = create_response.json()["id"]
        
        # Delete the post
        delete_response = admin_session.delete(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert delete_response.status_code == 200
        
        # Verify deletion
        get_response = requests.get(f"{BASE_URL}/api/blog/posts/{post_id}")
        assert get_response.status_code == 404
        print(f"Blog post deleted and verified")
    
    def test_blog_post_not_found(self):
        """Test getting non-existent blog post"""
        response = requests.get(f"{BASE_URL}/api/blog/posts/nonexistent-id-12345")
        assert response.status_code == 404
        print("Non-existent blog post correctly returns 404")


class TestUserManagement:
    """User management CRUD tests (Admin only)"""
    
    @pytest.fixture
    def admin_session(self):
        """Create authenticated admin session"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Admin login failed: {response.text}"
        return session
    
    def test_get_users_admin(self, admin_session):
        """Test getting all users as admin"""
        response = admin_session.get(f"{BASE_URL}/api/users")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1  # At least admin user
        print(f"Got {len(data)} users")
        
        # Verify admin user is in list
        admin_found = any(u["email"] == ADMIN_EMAIL for u in data)
        assert admin_found, "Admin user not found in users list"
    
    def test_get_users_unauthorized(self):
        """Test getting users without auth"""
        response = requests.get(f"{BASE_URL}/api/users")
        assert response.status_code == 401
        print("Unauthorized user list correctly rejected")
    
    def test_create_user_admin(self, admin_session):
        """Test creating a user as admin"""
        unique_email = f"TEST_newuser_{uuid.uuid4().hex[:8]}@example.com"
        user_data = {
            "email": unique_email,
            "password": "NewUser123!",
            "name": "New Test User",
            "role": "user"
        }
        
        response = admin_session.post(f"{BASE_URL}/api/users", json=user_data)
        assert response.status_code == 200, f"Create user failed: {response.text}"
        data = response.json()
        
        assert data["email"] == unique_email.lower()
        assert data["name"] == "New Test User"
        assert data["role"] == "user"
        assert "id" in data
        print(f"User created: {data['email']}")
        
        # Verify persistence
        users_response = admin_session.get(f"{BASE_URL}/api/users")
        users = users_response.json()
        user_found = any(u["email"] == unique_email.lower() for u in users)
        assert user_found, "Created user not found in users list"
        print("User verified in database")
        
        return data["id"]
    
    def test_update_user_admin(self, admin_session):
        """Test updating a user as admin"""
        # Create user first
        unique_email = f"TEST_updateuser_{uuid.uuid4().hex[:8]}@example.com"
        create_response = admin_session.post(f"{BASE_URL}/api/users", json={
            "email": unique_email,
            "password": "UpdateUser123!",
            "name": "Original Name",
            "role": "user"
        })
        assert create_response.status_code == 200
        user_id = create_response.json()["id"]
        
        # Update user
        update_response = admin_session.put(f"{BASE_URL}/api/users/{user_id}", json={
            "name": "Updated Name"
        })
        assert update_response.status_code == 200
        updated = update_response.json()
        assert updated["name"] == "Updated Name"
        print(f"User updated: {updated['name']}")
    
    def test_delete_user_admin(self, admin_session):
        """Test deleting a user as admin"""
        # Create user first
        unique_email = f"TEST_deleteuser_{uuid.uuid4().hex[:8]}@example.com"
        create_response = admin_session.post(f"{BASE_URL}/api/users", json={
            "email": unique_email,
            "password": "DeleteUser123!",
            "name": "Delete Me",
            "role": "user"
        })
        assert create_response.status_code == 200
        user_id = create_response.json()["id"]
        
        # Delete user
        delete_response = admin_session.delete(f"{BASE_URL}/api/users/{user_id}")
        assert delete_response.status_code == 200
        
        # Verify deletion
        users_response = admin_session.get(f"{BASE_URL}/api/users")
        users = users_response.json()
        user_found = any(u["id"] == user_id for u in users)
        assert not user_found, "Deleted user still found in users list"
        print("User deleted and verified")


class TestNewsletter:
    """Newsletter subscription tests"""
    
    @pytest.fixture
    def admin_session(self):
        """Create authenticated admin session"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200
        return session
    
    def test_subscribe_newsletter(self):
        """Test newsletter subscription"""
        unique_email = f"TEST_subscriber_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": unique_email}
        )
        assert response.status_code == 200, f"Subscribe failed: {response.text}"
        data = response.json()
        assert data["email"] == unique_email
        assert data["is_active"] == True
        print(f"Newsletter subscription successful: {data['email']}")
    
    def test_subscribe_duplicate_email(self):
        """Test duplicate newsletter subscription"""
        unique_email = f"TEST_duplicate_{uuid.uuid4().hex[:8]}@example.com"
        
        # First subscription
        response1 = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": unique_email}
        )
        assert response1.status_code == 200
        
        # Duplicate subscription
        response2 = requests.post(
            f"{BASE_URL}/api/newsletter/subscribe",
            json={"email": unique_email}
        )
        assert response2.status_code == 400
        data = response2.json()
        assert "already subscribed" in data["detail"].lower()
        print("Duplicate subscription correctly rejected")
    
    def test_get_subscribers_admin(self, admin_session):
        """Test getting subscribers as admin"""
        response = admin_session.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Got {len(data)} newsletter subscribers")
    
    def test_get_subscribers_unauthorized(self):
        """Test getting subscribers without auth"""
        response = requests.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 401
        print("Unauthorized subscriber list correctly rejected")


class TestProtectedRoutes:
    """Test admin-only route protection"""
    
    @pytest.fixture
    def regular_user_session(self):
        """Create a regular user and return authenticated session"""
        session = requests.Session()
        unique_email = f"TEST_regular_{uuid.uuid4().hex[:8]}@example.com"
        
        # Register regular user
        register_response = session.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": unique_email,
                "password": "RegularUser123!",
                "name": "Regular User"
            }
        )
        assert register_response.status_code == 200
        return session
    
    def test_blog_create_regular_user(self, regular_user_session):
        """Test that regular users cannot create blog posts"""
        post_data = {
            "title": "Unauthorized Post",
            "excerpt": "Should fail",
            "content": "Content",
            "category": "Job Search Tips",
            "author": "Regular User"
        }
        response = regular_user_session.post(f"{BASE_URL}/api/blog/posts", json=post_data)
        assert response.status_code == 403
        print("Regular user blog creation correctly rejected with 403")
    
    def test_users_list_regular_user(self, regular_user_session):
        """Test that regular users cannot list users"""
        response = regular_user_session.get(f"{BASE_URL}/api/users")
        assert response.status_code == 403
        print("Regular user users list correctly rejected with 403")
    
    def test_newsletter_subscribers_regular_user(self, regular_user_session):
        """Test that regular users cannot view subscribers"""
        response = regular_user_session.get(f"{BASE_URL}/api/newsletter/subscribers")
        assert response.status_code == 403
        print("Regular user subscribers list correctly rejected with 403")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
