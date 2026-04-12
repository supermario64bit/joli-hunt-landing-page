import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';

const categories = ["All", "Job Search Tips", "Productivity", "Interview Tips", "Tools & Software", "Career Growth"];

const BlogPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const category = selectedCategory === "All" ? null : selectedCategory;
      const search = searchQuery || null;
      const posts = await blogAPI.getAllPosts(category, search);
      setBlogPosts(posts);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SEO 
        title="JoliHunt Blog - Job Search Tips & Career Advice"
        description="Expert tips on job applications, resume building, interview preparation, and career growth. Learn how to organize your job search effectively."
        keywords="job search tips, resume tips, interview preparation, career advice, job application tracker, job hunting strategies"
      />
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4">
              Job Search Insights
            </h1>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Expert tips, strategies, and advice to help you land your dream job faster.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-12">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-[#D4A017] text-white shadow-lg'
                      : 'bg-white text-[#6B6B6B] hover:bg-[#D4A017] hover:bg-opacity-10 hover:text-[#D4A017]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Create Post Button (Admin Only) */}
          {isAdmin && (
            <div className="mb-8 flex justify-end">
              <button
                onClick={() => navigate('/admin/blog/create')}
                className="flex items-center gap-2 bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                Create New Post
              </button>
            </div>
          )}

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[#6B6B6B] font-semibold">Loading blog posts...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#6B6B6B] text-lg">No blog posts found.</p>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin/blog/create')}
                  className="mt-4 bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all"
                >
                  Create Your First Post
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <article
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  {post.image ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#D4A017] to-[#B8860B] flex items-center justify-center">
                      <span className="text-white text-4xl font-black">J</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    <span className="inline-block bg-[#D4A017] bg-opacity-10 text-[#D4A017] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#D4A017] transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-[#6B6B6B] mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-[#6B6B6B]">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      {post.readTime && (
                        <span className="text-xs">{post.readTime}</span>
                      )}
                    </div>

                    {/* Read More */}
                    <div className="mt-4 flex items-center gap-2 text-[#D4A017] font-semibold">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
