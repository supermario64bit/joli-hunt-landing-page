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

### ✅ Frontend Components (Mock Data)
1. **Navbar Component** - Sticky navigation with smooth scroll, mobile slide-in menu
2. **Hero Section** - Bold headline, dual CTAs, animated stat counters, floating mascot
3. **Problem Section** - 3 pain point cards with stagger animations
4. **Features Section** - Alternating layout with scroll-triggered slide animations
5. **Testimonials Section** - 3 cards with enhanced hover effects and entrance animations
6. **How It Works** - 3-step process with numbered circles and animations
7. **CTA Banner** - Newsletter signup form with validation and toast feedback
8. **Footer** - Dark theme with links, social icons, and branding
9. **Dashboard Mockups** - Stats, interviews, and pipeline visualizations (pure HTML/CSS)
10. **Mascot Component** - Animated "J with briefcase" character (SVG)

### 🎨 Animation Features
- ✅ Scroll-triggered fade-in-up animations for all sections
- ✅ Stagger animations for cards (appear sequentially)
- ✅ Slide-in-left/right animations for feature sections
- ✅ Animated stat counters (count from 0 to target)
- ✅ Floating mascot with swing animation on briefcase
- ✅ Enhanced hover effects (scale, translate, shadow)
- ✅ Parallax-style decorative elements
- ✅ Pulse animations on background patterns
- ✅ Rotate and scale on number circles hover
- ✅ Intersection Observer for performance optimization

### Design Features
- ✅ Fully responsive (mobile & desktop)
- ✅ Smooth scroll navigation with anchor links
- ✅ Mobile slide-in menu
- ✅ Custom scrollbar (amber themed)
- ✅ Microanimations throughout
- ✅ Newsletter form with email validation
- ✅ Toast notifications using Sonner
- ✅ No purple gradients - using amber/gold brand colors
- ✅ Lucide React icons (no emoji icons)
- ✅ DM Sans typography
- ✅ Inspired by Simplify.jobs layout patterns

## Mock Data Location
`/app/frontend/src/data/mockData.js` contains:
- Problem cards data
- Features data (tracker-focused)
- Testimonials data
- Steps data
- Navigation links
- Footer links
- Stats data
- Interview data

## Current Status
**Frontend Only** - Fully functional with mock data and smooth animations. All interactive elements work:
- Smooth scroll navigation
- Mobile menu toggle
- Newsletter form submission (mock)
- Scroll-triggered animations
- Animated stat counters
- Floating mascot
- Enhanced hover states

## Prioritized Backlog

### P0 - Backend Development (Next Phase)
1. Newsletter subscription API endpoint
2. MongoDB schema for newsletter subscribers
3. Email validation and duplicate prevention
4. Contact form submission endpoint
5. Analytics tracking for form submissions

### P1 - Enhancement Features
1. Add actual dashboard images/screenshots
2. Implement contact form in footer
3. Add pricing section with plan comparison
4. Blog preview section with latest posts
5. Video demo modal for "See how it works" button
6. Company logo strip (social proof)
7. More interactive mascot states (success, error, loading)

### P2 - Advanced Features
1. A/B testing for CTA copy and placement
2. SEO optimization (meta tags, structured data)
3. Performance optimization (lazy loading, code splitting)
4. Multi-language support
5. Dark mode toggle
6. Accessibility audit and improvements (WCAG compliance)
7. Integration with email marketing platform
8. Advanced animations (parallax scrolling, scroll-triggered timelines)

## Technical Notes
- Intersection Observer used for scroll animations (performance optimized)
- Animation delays use stagger pattern for sequential appearance
- All animations respect `prefers-reduced-motion` user preference
- Mascot SVG is lightweight and fully scalable
- CSS animations are GPU-accelerated for smooth performance

## Next Action Items
1. Review animations and mascot design
2. Decide on backend implementation timeline
3. Consider adding more mascot variations
4. Plan conversion tracking and analytics
5. A/B test CTA button copy and placement

## Notes
- All frontend interactions are currently client-side only
- Newsletter form uses mock submission (shows success toast)
- Navigation uses smooth scroll to page sections
- Mobile-first responsive design approach
- Animations trigger on scroll using Intersection Observer
- Mascot appears on desktop only (hidden on mobile for cleaner UX)
