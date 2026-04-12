import React, { useState, useEffect } from 'react';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { blogAPI } from '../services/api';

const AdminBlogPage = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Job Search Tips", "Productivity", "Interview Tips", "Tools & Software", "Career Growth"];

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error('Please login as admin to access this page');
      navigate('/admin/login');
    }
  }, [user, loading, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await blogAPI.createPost(formData);
      toast.success('✨ Blog post published successfully!');
      setTimeout(() => navigate('/blog'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#D4A017] transition-colors mb-4"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
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

              {/* Row 1: Category, Author, Read Time */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Category */}
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

                {/* Author */}
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

                {/* Read Time */}
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
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                />
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#D4A017] text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-[#B8860B] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? 'Publishing...' : 'Publish Post'}
              </button>
            </form>
          ) : (
            // Preview
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {formData.image && (
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                />
              )}

              <div className="mb-4">
                <span className="inline-block bg-[#D4A017] bg-opacity-10 text-[#D4A017] px-4 py-2 rounded-full text-sm font-semibold">
                  {formData.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-[#1C1C1C] mb-4">
                {formData.title || 'Untitled Post'}
              </h1>

              <div className="flex items-center gap-4 text-[#6B6B6B] mb-6">
                <span className="font-semibold">{formData.author || 'Author Name'}</span>
                {formData.readTime && (
                  <>
                    <span>•</span>
                    <span>{formData.readTime}</span>
                  </>
                )}
              </div>

              <p className="text-lg text-[#6B6B6B] italic mb-6">
                {formData.excerpt || 'Excerpt will appear here...'}
              </p>

              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap text-[#1C1C1C] leading-relaxed">
                  {formData.content || 'Content will appear here...'}
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
