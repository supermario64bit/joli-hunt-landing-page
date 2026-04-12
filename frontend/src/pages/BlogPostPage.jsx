import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Load blog post
    const savedBlogs = JSON.parse(localStorage.getItem('jolihunt_blog_posts') || '[]');
    const foundPost = savedBlogs.find(blog => blog.id === parseInt(id));
    
    if (foundPost) {
      setPost(foundPost);
      
      // Get related posts (same category, excluding current)
      const related = savedBlogs
        .filter(blog => blog.category === foundPost.category && blog.id !== foundPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">Post not found</h2>
          <button
            onClick={() => navigate('/blog')}
            className="text-[#D4A017] hover:underline"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <SEO
        title={`${post.title} | JoliHunt Blog`}
        description={post.excerpt}
        type="article"
      />
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-8 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#D4A017] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>

          {/* Category Badge */}
          <span className="inline-block text-xs font-semibold text-[#D4A017] bg-[#D4A017] bg-opacity-10 px-4 py-2 rounded-full mb-4">
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-[#6B6B6B] mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-semibold">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          {/* Excerpt */}
          <p className="text-xl text-[#6B6B6B] italic mb-8 pb-8 border-b-2 border-gray-100">
            {post.excerpt}
          </p>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-[#1C1C1C] leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>

        {/* CTA Section - Always at the end */}
        <div className="mt-12 bg-gradient-to-br from-[#D4A017] to-[#B8860B] rounded-2xl p-8 lg:p-12 text-center text-white shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-black mb-4">
            Ready to Organize Your Job Search?
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Stop losing track of applications. Start using JoliHunt today and land your dream job faster.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-[#D4A017] px-8 py-4 rounded-full font-black text-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-3"
          >
            Start Tracking - It's Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-black text-[#1C1C1C] mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <button
                  key={related.id}
                  onClick={() => navigate(`/blog/${related.id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-left"
                >
                  {related.image && (
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="text-xs font-semibold text-[#D4A017] bg-[#D4A017] bg-opacity-10 px-3 py-1 rounded-full">
                      {related.category}
                    </span>
                    <h4 className="text-lg font-black text-[#1C1C1C] mt-3 mb-2 line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-sm text-[#6B6B6B] line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
