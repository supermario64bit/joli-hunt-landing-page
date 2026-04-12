# JoliHunt - Product Requirements Document

## Summary
Fully responsive job search tracker SaaS landing page with modern design, SEO optimization, and complete blog system.

## Tech Stack
- **Frontend**: React + React Router + Inter font
- **Backend**: FastAPI + MongoDB
- **Styling**: Tailwind CSS + Custom animations
- **SEO**: React Helmet
- **Components**: Shadcn/UI

## Completed Features

### Phase 1 & 2 Complete ✅

**Design System:**
- Font: Inter (professional, modern)
- Primary Color: Amber #D4A017
- Yellow mascot with multiple variants
- Button gradients (135deg, #D4A017 to #B8860B)
- Softer shadows and depth

**Navigation:**
- Phone number: +91 7902498141
- Sticky navbar with hover underlines
- Mobile slide-in menu
- Links: Testimonials, Blog, Contact

**Hero Section:**
- Single CTA: "Start Tracking - It's Free"
- Animated stat counters (0→42, 0→28, etc.)
- Large yellow mascot (XL size, properly positioned)
- Gradient button with shine effect

**Video Demo Section:**
- YouTube embed (https://www.youtube.com/watch?v=uwAnvbtIjrg)
- Play button with pulsing animation
- "Join 1,000+ job seekers" trust badge
- Positioned BEFORE "Sound familiar?"

**Problem Section:**
- Custom mascot illustrations:
  - Tired mascot with spreadsheets
  - Worried mascot with calendar (X marks)
  - Confused mascot with question marks
- No Lucide icons - pure mascot illustrations

**Testimonials:**
- Title: "Real Stories"
- Horizontal scrolling carousel
- Left/Right navigation arrows
- 3 visible cards at a time
- Enhanced shadow and hover effects

**Features Section:**
- Alternating text/image layout
- Scroll-triggered animations
- Dashboard mockups

**Other Components:**
- How It Works (3 steps)
- CTA Banner with backend newsletter integration
- Footer with social links
- Floating CTA button (appears on scroll)

**Backend API:**
- POST /api/newsletter/subscribe - Saves emails to MongoDB
- GET /api/newsletter/subscribers - Get all subscribers
- Email validation with Pydantic

**Blog System:**
- Blog listing page (/blog)
- Admin blog creation (/admin/blog/create)
- Search and category filters
- "Create Post" button
- 6 mock blog posts
- Saves to localStorage (ready for MongoDB)

**SEO:**
- Comprehensive meta tags
- Open Graph + Twitter Cards
- JSON-LD structured data
- Keywords: job tracker, resume tracker, interview tracker, job application tracker
- Page-specific SEO

**Animations:**
- Scroll-triggered fade-in-up
- Stagger delays for cards
- Floating mascot
- Stat counter animation
- Button gradients with shine
- Hover wobble effects
- Smooth transitions throughout

## Routes
- `/` - Landing page
- `/blog` - Blog listing
- `/admin/blog/create` - Blog creation

## API Contracts

### Authentication APIs
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (sets httpOnly cookies)
- `POST /api/auth/logout` - Logout user (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Blog APIs
- `GET /api/blog/posts` - Get all posts (public, supports ?category=X&search=Y)
- `GET /api/blog/posts/{id}` - Get single post (public)
- `POST /api/blog/posts` - Create post (admin only)
- `PUT /api/blog/posts/{id}` - Update post (admin only)
- `DELETE /api/blog/posts/{id}` - Delete post (admin only)

### User Management APIs
- `GET /api/users` - Get all users (admin only)
- `POST /api/users` - Create user (admin only)
- `PUT /api/users/{id}` - Update user (admin only)
- `DELETE /api/users/{id}` - Delete user (admin only)

### Newsletter APIs
- `POST /api/newsletter/subscribe` - Subscribe email (public)
- `GET /api/newsletter/subscribers` - Get subscribers (admin only)

## Security Features
- JWT-based authentication with httpOnly cookies
- Bcrypt password hashing
- Brute force protection (5 attempts = 15 min lockout)
- Password reset with time-limited tokens
- Role-based access control (admin/user)

## Next Steps
1. ✅ Backend authentication complete
2. ✅ MongoDB schemas implemented
3. Connect React frontend to backend APIs
4. Migrate localStorage data to MongoDB
5. More mascot states for other sections
6. A/B test CTAs

## Brand Identity
- Mascot: Yellow "J" character (#D4A017)
- Variants: default, tired, worried, confused, reading, presenting
- Sizes: sm, md, lg, xl
- Animations: float, swing, pulse

## Database Collections
- newsletter_subscriptions (active)
- blog_posts (future)

## Performance
- Intersection Observer for scroll animations
- CSS GPU-accelerated animations
- Code splitting ready
- Lazy loading ready

