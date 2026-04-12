# Authentication Testing Playbook

## Step 1: MongoDB Verification

Connect to MongoDB and verify admin user and indexes:

```bash
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```

**Expected Results:**
- Admin user exists with email: `admin@jolihunt.com`
- Password hash starts with `$2b$` (bcrypt format)
- Indexes exist on:
  - `users.email` (unique)
  - `login_attempts.identifier`
  - `password_reset_tokens.expires_at` (TTL)

## Step 2: API Testing

### Test Registration
```bash
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)

curl -c cookies.txt -X POST "$API_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'
```

**Expected:** User object returned, cookies set

### Test Login
```bash
curl -c cookies.txt -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jolihunt.com","password":"JoliHunt2026!"}'

# Verify cookies were set
cat cookies.txt
```

**Expected:** Admin user object returned, `access_token` and `refresh_token` cookies set

### Test Auth Me (Protected Route)
```bash
curl -b cookies.txt "$API_URL/api/auth/me"
```

**Expected:** Admin user object returned

### Test Logout
```bash
curl -b cookies.txt -X POST "$API_URL/api/auth/logout"
```

**Expected:** Success message, cookies cleared

## Step 3: Brute Force Protection

Attempt 6 failed logins:
```bash
for i in {1..6}; do
  curl -X POST "$API_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@jolihunt.com","password":"wrongpassword"}'
  echo "Attempt $i"
done
```

**Expected:** After 5 failed attempts, 6th attempt returns 429 status code with lockout message

## Step 4: Blog Post Testing (Admin Only)

Login first, then test blog operations:
```bash
# Login as admin
curl -c cookies.txt -X POST "$API_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jolihunt.com","password":"JoliHunt2026!"}'

# Create blog post
curl -b cookies.txt -X POST "$API_URL/api/blog/posts" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog Post",
    "excerpt": "This is a test excerpt",
    "content": "Full blog content here",
    "category": "Job Search Tips",
    "author": "Admin",
    "readTime": "5 min read"
  }'

# Get all posts
curl "$API_URL/api/blog/posts"

# Delete post (save post_id from create response)
curl -b cookies.txt -X DELETE "$API_URL/api/blog/posts/{post_id}"
```

## Step 5: User Management Testing (Admin Only)

```bash
# Create user
curl -b cookies.txt -X POST "$API_URL/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "User123!",
    "name": "New User",
    "role": "user"
  }'

# Get all users
curl -b cookies.txt "$API_URL/api/users"

# Update user (save user_id from create response)
curl -b cookies.txt -X PUT "$API_URL/api/users/{user_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'

# Delete user
curl -b cookies.txt -X DELETE "$API_URL/api/users/{user_id}"
```

## Step 6: Frontend Integration

After backend is working, test frontend:

1. Navigate to `/admin/login`
2. Login with admin@jolihunt.com / JoliHunt2026!
3. Verify redirect to admin dashboard
4. Test blog creation
5. Test user management
6. Test logout

## Common Issues

### Issue: Cookies not being set
**Solution:** Check CORS configuration includes `allow_credentials=True` and frontend origin

### Issue: Token expired immediately
**Solution:** Check server time is correct, JWT exp calculation uses UTC

### Issue: Password verification fails
**Solution:** Verify bcrypt hash in .env doesn't have shell variable expansion (use double quotes)

### Issue: 401 on protected routes
**Solution:** Verify cookies are being sent with `credentials: 'include'` in fetch/axios
