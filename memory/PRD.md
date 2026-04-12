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

## Architecture
- **Frontend**: React with React Router
- **UI Components**: Shadcn/UI components
- **Styling**: Tailwind CSS with custom theme
- **Fonts**: Google Fonts (DM Sans)
- **Toast Notifications**: Sonner

## What's Been Implemented (December 2025)

### ✅ Frontend Components (Mock Data)
1. **Navbar Component** - Sticky navigation with smooth scroll, mobile slide-in menu
2. **Hero Section** - Bold headline, dual CTAs, stats dashboard mockup
3. **Problem Section** - 3 pain point cards with icons (spreadsheets, missed dates, unclear status)
4. **Features Section** - Alternating layout with 3 features and HTML/CSS mockups
5. **Testimonials Section** - 3 testimonial cards with avatars and quotes
6. **How It Works** - 3-step process with numbered circles
7. **CTA Banner** - Newsletter signup form with validation and toast feedback
8. **Footer** - Dark theme with links, social icons, and branding
9. **Dashboard Mockups** - Stats, interviews, and pipeline visualizations (pure HTML/CSS)

### Design Features
- ✅ Fully responsive (mobile & desktop)
- ✅ Smooth scroll navigation with anchor links
- ✅ Mobile slide-in menu
- ✅ Custom scrollbar (amber themed)
- ✅ Hover animations on cards and buttons
- ✅ Newsletter form with email validation
- ✅ Toast notifications using Sonner
- ✅ No purple gradients - using amber/gold brand colors
- ✅ Lucide React icons (no emoji icons)
- ✅ DM Sans typography

## Mock Data Location
`/app/frontend/src/data/mockData.js` contains:
- Problem cards data
- Features data
- Testimonials data
- Steps data
- Navigation links
- Footer links
- Stats data
- Interview data

## Current Status
**Frontend Only** - Fully functional with mock data. All interactive elements work:
- Smooth scroll navigation
- Mobile menu toggle
- Newsletter form submission (mock)
- Button hover states
- Card hover effects

## Prioritized Backlog

### P0 - Backend Development (Next Phase)
1. Newsletter subscription API endpoint
2. MongoDB schema for newsletter subscribers
3. Email validation and duplicate prevention
4. Contact form submission endpoint (if needed)
5. Analytics tracking for form submissions

### P1 - Enhancement Features
1. Add actual dashboard images/screenshots (replace HTML/CSS mockups)
2. Implement contact form in footer
3. Add pricing section with plan comparison
4. Blog preview section with latest posts
5. Video demo modal for "See how it works" button
6. Animated statistics counter on scroll
7. Success stories/case studies page

### P2 - Advanced Features
1. A/B testing for CTA copy and placement
2. SEO optimization (meta tags, structured data)
3. Performance optimization (lazy loading, code splitting)
4. Multi-language support
5. Dark mode toggle
6. Accessibility audit and improvements (WCAG compliance)
7. Integration with email marketing platform (e.g., Mailchimp)

## Next Action Items
1. Review and approve frontend design
2. Gather feedback on user experience and conversions
3. Decide on backend implementation:
   - Newsletter subscription storage
   - Email service integration
   - Contact form handling
4. Consider adding real product screenshots
5. Plan A/B testing for conversion optimization

## Notes
- All frontend interactions are currently client-side only
- Newsletter form uses mock submission (shows success toast)
- Navigation uses smooth scroll to page sections
- Mobile-first responsive design approach
- No external dependencies for images (all mockups are HTML/CSS)
