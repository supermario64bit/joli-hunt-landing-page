# JoliHunt - Product Requirements Document

## Original Problem Statement
Design a fully responsive landing page for JoliHunt — a job search tracker SaaS. Must look great on both mobile and desktop. No purple gradients. No generic AI aesthetics.

## User Personas
- **Primary**: Job seekers actively managing multiple applications
- **Secondary**: Career changers and recent graduates organizing their job search
- **Tertiary**: Professionals tracking opportunities across different companies

## Brand Identity
- **Primary Color**: Amber/Gold #D4A017
- **Dark Accent**: #1A1A1A
- **Main Background**: Warm white #FAFAF8
- **Typography**: DM Sans (clean, editorial, bold headings)
- **Mascot**: "J" character with briefcase (animated SVG)

## Architecture
- **Frontend**: React with React Router
- **UI Components**: Shadcn/UI components
- **Styling**: Tailwind CSS with custom theme
- **Fonts**: Google Fonts (DM Sans)
- **Toast Notifications**: Sonner
- **Animations**: CSS animations + Intersection Observer API

## What's Been Implemented (December 2025)

### ✅ Pages & Routing
1. **Landing Page** (/) - Full marketing page with all sections
2. **Blog Page** (/blog) - Blog listing with category filters and search

### ✅ Frontend Components (Mock Data)
1. **Navbar Component** - Sticky navigation with Blog link, mobile slide-in menu, route navigation
2. **Hero Section** - Single CTA "Start Tracking - It's Free", animated stat counters, floating mascot
3. **Problem Section** - 3 pain point cards with stagger animations
4. **Features Section** - Alternating layout (text left/image right, then text right/image left)
5. **Testimonials Section** - 3 cards with enhanced hover effects and entrance animations
6. **How It Works** - 3-step process with numbered circles and animations
7. **CTA Banner** - Newsletter signup form with validation and toast feedback
8. **Footer** - Dark theme with links, social icons, and branding
9. **Dashboard Mockups** - Stats, interviews, and pipeline visualizations (pure HTML/CSS)
10. **Mascot Component** - Animated "J with briefcase" character (SVG)
11. **Blog Page Component** - Category filters, search, card grid with hover effects

### 🎨 Animation Features
- ✅ Scroll-triggered fade-in-up animations for all sections
- ✅ Stagger animations for cards (appear sequentially)
- ✅ Slide-in-left/right animations for alternating feature sections
- ✅ Animated stat counters (count from 0 to target)
- ✅ Floating mascot with swing animation on briefcase
- ✅ Enhanced hover effects (scale, translate, shadow)
- ✅ Parallax-style decorative elements
- ✅ Pulse animations on background patterns
- ✅ Rotate and scale on number circles hover
- ✅ Intersection Observer for performance optimization

### 📝 Blog Features
- ✅ 6 mock blog posts with realistic content
- ✅ Category filtering (All, Job Search Tips, Productivity, Interview Tips, etc.)
- ✅ Search functionality (searches title and excerpt)
- ✅ Blog card design with images, author, date, read time
- ✅ Responsive grid layout (3 columns → 2 → 1)
- ✅ Hover animations on cards
- ✅ Category badges with amber accent
- ✅ "Read More" call-to-action

### Design Features
- ✅ Fully responsive (mobile & desktop)
- ✅ Smooth scroll navigation with anchor links
- ✅ Route-based navigation (Blog page)
- ✅ Mobile slide-in menu
- ✅ Custom scrollbar (amber themed)
- ✅ Microanimations throughout
- ✅ Newsletter form with email validation
- ✅ Toast notifications using Sonner
- ✅ No purple gradients - using amber/gold brand colors
- ✅ Lucide React icons (no emoji icons)
- ✅ DM Sans typography
- ✅ Inspired by Simplify.jobs layout patterns
- ✅ Alternating feature layout (text/image sides swap)

## Mock Data Location
`/app/frontend/src/data/mockData.js` contains:
- Problem cards data
- Features data (tracker-focused, alternating positions)
- Testimonials data
- Steps data
- Navigation links (with Blog)
- Footer links
- Stats data
- Interview data

`/app/frontend/src/pages/BlogPage.jsx` contains:
- 6 blog posts with mock data
- Category filters
- Search functionality

## Current Status
**Frontend Only** - Fully functional with mock data and smooth animations. All interactive elements work:
- Smooth scroll navigation
- Route navigation (Landing ↔ Blog)
- Mobile menu toggle
- Newsletter form submission (mock)
- Scroll-triggered animations
- Animated stat counters
- Floating mascot
- Enhanced hover states
- Blog category filtering
- Blog search

## Prioritized Backlog

### P0 - Backend Development (Next Phase)
1. Newsletter subscription API endpoint
2. MongoDB schema for newsletter subscribers
3. Blog posts CRUD API
4. Blog content management
5. Email validation and duplicate prevention
6. Contact form submission endpoint
7. Analytics tracking for form submissions

### P1 - Enhancement Features
1. Individual blog post pages (single post view)
2. Blog pagination or infinite scroll
3. Related posts section
4. Blog post sharing (social media)
5. Add actual dashboard images/screenshots
6. Implement contact form in footer
7. Add pricing section with plan comparison
8. Video demo modal
9. Company logo strip (social proof)
10. More interactive mascot states (success, error, loading)
11. Blog post comments system

### P2 - Advanced Features
1. A/B testing for CTA copy and placement
2. SEO optimization (meta tags, structured data, Open Graph)
3. Blog RSS feed
4. Performance optimization (lazy loading, code splitting)
5. Multi-language support
6. Dark mode toggle
7. Accessibility audit and improvements (WCAG compliance)
8. Integration with email marketing platform
9. Advanced animations (parallax scrolling, scroll-triggered timelines)
10. Blog admin panel for content management

## Technical Notes
- React Router for navigation between pages
- Intersection Observer used for scroll animations (performance optimized)
- Animation delays use stagger pattern for sequential appearance
- All animations respect `prefers-reduced-motion` user preference
- Mascot SVG is lightweight and fully scalable
- CSS animations are GPU-accelerated for smooth performance
- Blog filtering and search done client-side (will move to backend)
- Navbar handles both anchor links (#features) and routes (/blog)

## Routes
- `/` - Landing page
- `/blog` - Blog listing page

## Next Action Items
1. Build backend for blog posts management
2. Create individual blog post pages
3. Implement newsletter subscription backend
4. Add blog post creation/editing admin panel
5. SEO optimization for blog posts
6. Consider blog pagination vs infinite scroll
7. Add social sharing for blog posts

## Notes
- All frontend interactions are currently client-side only
- Newsletter form uses mock submission (shows success toast)
- Navigation uses smooth scroll for anchor links, React Router for pages
- Mobile-first responsive design approach
- Animations trigger on scroll using Intersection Observer
- Mascot appears on desktop only (hidden on mobile for cleaner UX)
- Blog posts are hardcoded in component (will move to API)
- Features section uses alternating layout as specified
