import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { blogAPI } from '../services/api';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const postData = await blogAPI.getPost(id);
      setPost(postData);
      
      // Fetch related posts (same category)
      const allPosts = await blogAPI.getAllPosts(postData.category);
      const related = allPosts.filter(p => p.id !== id).slice(0, 3);
      setRelatedPosts(related);
    } catch (error) {
      console.error('Failed to fetch post:', error);
      setPost(null);
    } finally {
      setLoading(false);
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
            {post.readTime && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime}</span>
                </div>
              </>
            )}
            {post.date && (
              <>
                <span>•</span>
                <span>{post.date}</span>
              </>
            )}
          </div>

          {/* Excerpt */}
          <p className="text-xl text-[#6B6B6B] italic leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-[#1C1C1C] leading-relaxed text-lg">
              {post.content}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#D4A017] to-[#B8860B] rounded-2xl p-8 text-center text-white shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Ready to Organize Your Job Search?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of job seekers who are landing more interviews with JoliHunt
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-[#D4A017] px-8 py-4 rounded-lg font-black text-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Start Tracking - It's Free
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <h2 className="text-3xl font-bold text-[#1C1C1C] mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map(relatedPost => (
              <article
                key={relatedPost.id}
                onClick={() => navigate(`/blog/${relatedPost.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {relatedPost.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#D4A017] to-[#B8860B] flex items-center justify-center">
                    <span className="text-white text-4xl font-black">J</span>
                  </div>
                )}

                <div className="p-6">
                  <span className="inline-block bg-[#D4A017] bg-opacity-10 text-[#D4A017] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {relatedPost.category}
                  </span>

                  <h3 className="text-lg font-bold text-[#1C1C1C] mb-2 group-hover:text-[#D4A017] transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[#D4A017] font-semibold text-sm">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
