# JoliHunt - Product Requirements Document

## Original Problem Statement
Design a fully responsive landing page for JoliHunt — a job search tracker SaaS. Must look great on both mobile and desktop. No purple gradients. No generic AI aesthetics.

## User Personas
- **Primary**: Job seekers actively managing multiple applications
- **Secondary**: Career changers and recent graduates organizing their job search
- **Tertiary**: Professionals tracking opportunities across different companies

## Brand Identity
- **Primary Color**: Amber/Gold #D4A017 (mascot and brand color)
- **Dark Accent**: #1A1A1A
- **Main Background**: Warm white #FAFAF8
- **Typography**: DM Sans (clean, editorial, bold headings)
- **Mascot**: "J" character with briefcase (animated SVG, yellow color)

## Architecture
- **Frontend**: React with React Router
- **Backend**: FastAPI + MongoDB
- **UI Components**: Shadcn/UI components
- **Styling**: Tailwind CSS with custom theme
- **Fonts**: Google Fonts (DM Sans)
- **Toast Notifications**: Sonner
- **Animations**: CSS animations + Intersection Observer API
- **SEO**: React Helmet for meta tags

## What's Been Implemented (December 2025)

### ✅ Pages & Routing
1. **Landing Page** (/) - Full marketing page with SEO optimization
2. **Blog Page** (/blog) - Blog listing with category filters, search, and "Create Post" button
3. **Admin Blog Page** (/admin/blog/create) - Blog creation interface

### ✅ Frontend Components
1. **Navbar** - Testimonials, Blog, Contact links only (removed Features & How It Works)
2. **Hero Section** - Single CTA "Start Tracking - It's Free", animated stat counters, LARGE yellow mascot (xl size, highly visible)
3. **Problem Section** - 3 cards with yellow mascot in background
4. **Features Section** - Alternating text/image layout
5. **Testimonials Section** - 3 cards with animations
6. **How It Works** - 3-step process
7. **CTA Banner** - Newsletter with REAL backend integration
8. **Footer** - Dark theme with links and branding
9. **Mascot Component** - Yellow (#D4A017), multiple sizes (sm, md, lg, xl), variants (default, reading, presenting)
10. **SEO Component** - React Helmet with comprehensive meta tags
11. **Admin Blog Form** - Complete blog creation with preview

### 🎨 Mascot Integration
- ✅ Hero: Extra large floating mascot (xl size) - highly visible
- ✅ Problem Section: Background mascot (lg size, 20% opacity)
- ✅ Yellow color (#D4A017) matching brand
- ✅ Multiple variants for different contexts
- ✅ Sizes: sm (16x24), md (24x32), lg (32x44), xl (48x64)

### 🔧 Backend API Endpoints
- ✅ `POST /api/newsletter/subscribe` - Save email to MongoDB
- ✅ `GET /api/newsletter/subscribers` - Get all subscribers
- ✅ Newsletter emails stored in MongoDB collection
- ✅ Duplicate email prevention
- ✅ Email validation using Pydantic EmailStr

### 📝 Blog Features
- ✅ Admin blog creation page (/admin/blog/create)
- ✅ Form with: Title, Excerpt, Content, Category, Author, Read Time, Image URL
- ✅ Preview mode for blog posts
- ✅ Saved to localStorage (will move to MongoDB backend)
- ✅ "Create Post" button in blog page header
- ✅ 6 mock blog posts with categories
- ✅ Search and filter functionality

### 🔍 SEO Optimization
- ✅ React Helmet integration
- ✅ Primary meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD for WebApplication)
- ✅ Canonical URLs
- ✅ Keywords targeting: job tracker, resume tracker, job application tracker, interview tracker, career tracker, job search organizer
- ✅ Page-specific SEO (Landing, Blog)

### Design Updates
- ✅ Removed "How It Works" and "Features" from navigation
- ✅ Changed button text to "Start Tracking - It's Free"
- ✅ Removed second CTA button from hero
- ✅ Mascot color changed to yellow (#D4A017)
- ✅ Mascot size increased (xl) for better visibility
- ✅ Mascots added to sections for context
- ✅ Newsletter form connected to backend

## Mock Data Location
`/app/frontend/src/data/mockData.js` contains:
- Problem cards data
- Features data (tracker-focused, alternating positions)
- Testimonials data
- Steps data
- Navigation links (Testimonials, Blog, Contact only)
- Footer links
- Stats data

`/app/frontend/src/pages/BlogPage.jsx` contains:
- 6 blog posts with mock data

## Backend Database Collections
- `newsletter_subscriptions` - Email subscribers
- Future: `blog_posts` - Published blog articles

## Current Status
**Full-Stack (Frontend + Backend Newsletter)**:
- Frontend fully functional with animations and SEO
- Newsletter subscription saves to MongoDB backend
- Admin blog creation page (saves to localStorage, ready for backend)
- Yellow mascot highly visible throughout site
- SEO optimized for job search keywords

## Prioritized Backlog

### P0 - Backend Development
1. Blog posts CRUD API (MongoDB)
2. Blog content management backend
3. Move blog posts from localStorage to MongoDB
4. Blog post publishing workflow
5. Individual blog post pages

### P1 - Enhancement Features
1. Admin authentication for blog creation
2. Blog post editing/deletion
3. Rich text editor for blog content
4. Image upload for blog posts
5. Blog pagination or infinite scroll
6. Related posts section
7. Blog post sharing (social media)
8. Add more mascot variants per section
9. Sitemap.xml generation
10. robots.txt file

### P2 - Advanced Features
1. Blog comments system
2. Blog RSS feed
3. A/B testing for CTAs
4. Performance optimization (lazy loading, code splitting)
5. Multi-language support
6. Dark mode toggle
7. Accessibility audit (WCAG compliance)
8. Email marketing integration
9. Analytics tracking
10. Company logo strip

## Technical Notes
- React Router for navigation
- Intersection Observer for scroll animations
- Mascot sizes controlled via props
- Newsletter backend uses Pydantic EmailStr for validation
- Blog posts currently in localStorage (admin feature)
- SEO meta tags using React Helmet
- Structured data for rich search results

## Routes
- `/` - Landing page (SEO optimized)
- `/blog` - Blog listing page
- `/admin/blog/create` - Admin blog creation page (no auth yet)

## SEO Keywords Targeting
- Primary: job tracker, job application tracker, job search organizer
- Secondary: resume tracker, interview tracker, career tracker
- Long-tail: organize job applications, track job interviews, job hunt management

## Next Action Items
1. Move blog posts from localStorage to MongoDB backend
2. Add authentication for admin blog creation
3. Create individual blog post pages
4. Add more mascot states (success, error, thinking)
5. Generate sitemap.xml for SEO
6. Add robots.txt file
7. Consider adding mascots to Testimonials and HowItWorks sections

## Notes
- Mascot is yellow (#D4A017) matching logo color
- Mascot xl size (48x64) very visible in hero
- Newsletter emails saved to MongoDB via POST /api/newsletter/subscribe
- Blog creation stores to localStorage temporarily
- Only admin-created blogs should be published (auth needed)
- Features and How It Works removed from navigation
- SEO meta tags comprehensive for Google ranking
