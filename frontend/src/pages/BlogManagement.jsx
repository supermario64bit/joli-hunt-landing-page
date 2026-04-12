import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const BlogManagement = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('jolihunt_admin');
    if (!isAdmin) {
      toast.error('Please login to access admin panel');
      navigate('/admin/login');
      return;
    }

    // Load blogs from localStorage
    const savedBlogs = JSON.parse(localStorage.getItem('jolihunt_blog_posts') || '[]');
    setBlogs(savedBlogs);
  }, [navigate]);

  const handleDelete = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedBlogs = blogs.filter(b => b.id !== blogId);
      localStorage.setItem('jolihunt_blog_posts', JSON.stringify(updatedBlogs));
      setBlogs(updatedBlogs);
      toast.success('Blog post deleted successfully!');
    }
  };

  const handleView = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#D4A017]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-[#6B6B6B] hover:text-[#D4A017] transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-[#1C1C1C]">Manage Blog Posts</h1>
                <p className="text-[#6B6B6B] text-sm">Edit or delete existing posts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#6B6B6B] text-lg mb-4">No blog posts yet.</p>
            <button
              onClick={() => navigate('/admin/blog/create')}
              className="bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all"
            >
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100">
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  {/* Blog Image */}
                  <div className="md:col-span-1">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Blog Info */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#D4A017] bg-[#D4A017] bg-opacity-10 px-3 py-1 rounded-full">
                        {blog.category}
                      </span>
                      {blog.readTime && (
                        <span className="text-xs text-[#6B6B6B]">{blog.readTime}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-[#1C1C1C] mb-2">{blog.title}</h3>
                    <p className="text-[#6B6B6B] text-sm line-clamp-2 mb-2">{blog.excerpt}</p>
                    <p className="text-xs text-[#6B6B6B]">
                      By {blog.author} • {blog.date}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-1 flex md:flex-col gap-2">
                    <button
                      onClick={() => handleView(blog.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
