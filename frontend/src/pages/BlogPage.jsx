import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Tips to Organize Your Job Search in 2026",
    excerpt: "Learn how to streamline your job search process and land more interviews with these proven strategies.",
    author: "Sarah Chen",
    date: "January 15, 2026",
    category: "Job Search Tips",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "How to Track Multiple Job Applications Effectively",
    excerpt: "Stop losing track of your applications. Discover the best methods to stay organized during your job hunt.",
    author: "Marcus Johnson",
    date: "January 12, 2026",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "The Ultimate Job Interview Preparation Checklist",
    excerpt: "Never miss an interview deadline again. Use this comprehensive checklist to ace every interview.",
    author: "Priya Patel",
    date: "January 10, 2026",
    category: "Interview Tips",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Why Spreadsheets Are Killing Your Job Search",
    excerpt: "Find out why traditional spreadsheets are inefficient and what you should use instead.",
    author: "David Kim",
    date: "January 8, 2026",
    category: "Tools & Software",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Networking Strategies That Actually Work in 2026",
    excerpt: "Build meaningful connections and boost your job search with these modern networking tactics.",
    author: "Emily Rodriguez",
    date: "January 5, 2026",
    category: "Career Growth",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    readTime: "8 min read"
  },
  {
    id: 6,
    title: "How to Follow Up After Job Applications",
    excerpt: "Master the art of following up without being pushy. Learn when and how to reach out to recruiters.",
    author: "Alex Thompson",
    date: "January 3, 2026",
    category: "Job Search Tips",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    readTime: "5 min read"
  }
];

const categories = ["All", "Job Search Tips", "Productivity", "Interview Tips", "Tools & Software", "Career Growth"];

const BlogPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminStatus = sessionStorage.getItem('jolihunt_admin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SEO 
        title="JoliHunt Blog - Job Search Tips & Career Advice"
        description="Expert tips on job applications, resume building, interview preparation, and career growth. Learn how to organize your job search effectively."
        keywords="job search tips, resume tips, interview preparation, career advice, job application tracker, job hunting strategies"
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-white to-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1C] mb-6 animate-fade-in-up">
                JoliHunt <span className="text-[#D4A017]">Blog</span>
              </h1>
              <p className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-8 animate-fade-in-up delay-100">
                Insights, tips, and strategies to help you organize your job search and land your dream role.
              </p>
            </div>
            
            {/* Admin Create Blog Button - Only show if logged in */}
            {isAdmin && (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="hidden lg:flex items-center gap-2 bg-[#D4A017] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8860B] transition-all duration-200 hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Admin Dashboard
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative animate-fade-in-up delay-200">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B6B6B] w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#D4A017] text-white shadow-lg'
                    : 'bg-gray-100 text-[#6B6B6B] hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-[#6B6B6B]">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-${index * 100}`}
                >
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#D4A017] bg-[#D4A017] bg-opacity-10 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#6B6B6B]">{post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-[#1C1C1C] mb-3 line-clamp-2 hover:text-[#D4A017] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-[#6B6B6B] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#6B6B6B]" />
                        <span className="text-sm text-[#6B6B6B]">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#6B6B6B]" />
                        <span className="text-sm text-[#6B6B6B]">{post.date}</span>
                      </div>
                    </div>

                    <button className="mt-4 flex items-center gap-2 text-[#D4A017] font-semibold hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
