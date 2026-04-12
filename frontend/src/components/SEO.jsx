import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title = "JoliHunt - Job Application Tracker | Organize Your Job Search",
  description = "Track job applications, never miss interviews, and land your dream job faster. JoliHunt helps you organize your entire job search in one place. Free job tracker app for job seekers.",
  keywords = "job tracker, job application tracker, job search organizer, resume tracker, interview tracker, job hunt app, career tracker, application management, job search tool, employment tracker, job board tracker, job application spreadsheet alternative, job hunting software, career management tool, job search manager",
  ogImage = "https://application-hub-29.preview.emergentagent.com/og-image.jpg",
  url = "https://application-hub-29.preview.emergentagent.com",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="JoliHunt" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="JoliHunt" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:creator" content="@jolihunt" />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#D4A017" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "JoliHunt",
          "url": url,
          "logo": `${url}/logo.png`,
          "description": description,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-790-249-8141",
            "contactType": "Customer Service",
            "areaServed": "IN",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://twitter.com/jolihunt",
            "https://linkedin.com/company/jolihunt"
          ]
        })}
      </script>
      
      {/* Structured Data - WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "JoliHunt",
          "description": description,
          "url": url,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free forever plan"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1250",
            "bestRating": "5",
            "worstRating": "1"
          },
          "screenshot": ogImage,
          "featureList": "Job application tracking, Interview scheduling, Application status management, Job search analytics"
        })}
      </script>

      {/* Structured Data - BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": url
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Features",
              "item": `${url}#features`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Blog",
              "item": `${url}/blog`
            }
          ]
        })}
      </script>

      {/* Structured Data - FAQPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is JoliHunt?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "JoliHunt is a job application tracker that helps you organize your entire job search. Track applications, never miss interviews, and land your dream job faster."
              }
            },
            {
              "@type": "Question",
              "name": "Is JoliHunt free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! JoliHunt offers a free forever plan with essential job tracking features."
              }
            },
            {
              "@type": "Question",
              "name": "How does JoliHunt help with job applications?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "JoliHunt helps you track every application, schedule interviews, monitor deadlines, and visualize your job search pipeline - all in one organized place."
              }
            }
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
