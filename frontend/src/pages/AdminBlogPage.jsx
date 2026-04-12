import React, { useState, useEffect } from 'react';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminBlogPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('jolihunt_admin');
    if (!isAdmin) {
      toast.error('Please login to access admin panel');
      navigate('/admin/login');
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Job Search Tips',
    author: '',
    readTime: '',
    image: ''
  });

  const [isPreview, setIsPreview] = useState(false);

  const categories = ["Job Search Tips", "Productivity", "Interview Tips", "Tools & Software", "Career Growth"];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      toast.error('Please fill in all required fields');
      return;
    }

    // For now, just show success and store in localStorage
    // In production, this would call backend API
    const blogPost = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Get existing posts
    const existingPosts = JSON.parse(localStorage.getItem('jolihunt_blog_posts') || '[]');
    existingPosts.unshift(blogPost);
    localStorage.setItem('jolihunt_blog_posts', JSON.stringify(existingPosts));

    toast.success('✨ Blog post published successfully!');
    setTimeout(() => navigate('/blog'), 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#D4A017] transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C]">
                {isPreview ? 'Preview Post' : 'Create New Blog Post'}
              </h1>
            </div>
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#D4A017] text-[#D4A017] rounded-lg hover:bg-[#D4A017] hover:text-white transition-all"
            >
              <Eye className="w-5 h-5" />
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </div>

          {/* Form */}
          {!isPreview ? (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-8 shadow-lg">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter blog post title..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  required
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Brief summary of the post..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Write your blog post content..."
                  rows="12"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Category & Author Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Read Time & Image Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="e.g., 5 min read"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#D4A017] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B8860B] transition-all duration-200 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Publish Blog Post
              </button>
            </form>
          ) : (
            /* Preview */
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#D4A017] bg-[#D4A017] bg-opacity-10 px-3 py-1 rounded-full">
                  {formData.category}
                </span>
                {formData.readTime && (
                  <span className="text-xs text-[#6B6B6B] ml-3">{formData.readTime}</span>
                )}
              </div>
              
              {formData.image && (
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C] mb-4">
                {formData.title || 'Your Title Here'}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-6">
                <span>By {formData.author || 'Author'}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              
              <p className="text-lg text-[#6B6B6B] mb-6 italic">
                {formData.excerpt || 'Your excerpt will appear here...'}
              </p>
              
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-wrap text-[#1C1C1C] leading-relaxed">
                  {formData.content || 'Your blog content will appear here...'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminBlogPage;
