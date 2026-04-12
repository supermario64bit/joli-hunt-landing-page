import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, LogOut, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('jolihunt_admin');
    if (!isAdmin) {
      toast.error('Please login to access admin panel');
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('jolihunt_admin');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const cards = [
    {
      title: 'Create Blog Post',
      description: 'Write and publish new blog articles',
      icon: Plus,
      color: '#D4A017',
      path: '/admin/blog/create'
    },
    {
      title: 'Manage Blogs',
      description: 'Edit or delete existing blog posts',
      icon: FileText,
      color: '#10B981',
      path: '/admin/blog/manage'
    },
    {
      title: 'User Management',
      description: 'Add, edit or remove users',
      icon: Users,
      color: '#3B82F6',
      path: '/admin/users'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] to-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-[#D4A017]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-[#D4A017]">JOLIHUNT</h1>
              <p className="text-[#6B6B6B] font-semibold">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="text-[#6B6B6B] hover:text-[#D4A017] font-semibold transition-colors"
              >
                View Site
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-black text-[#1C1C1C] mb-8">Quick Actions</h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(card.path)}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-[#D4A017] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left group"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${card.color}20` }}
                >
                  <IconComponent className="w-8 h-8" style={{ color: card.color }} />
                </div>
                <h3 className="text-xl font-black text-[#1C1C1C] mb-2">{card.title}</h3>
                <p className="text-[#6B6B6B]">{card.description}</p>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#D4A017] to-[#B8860B] text-white rounded-2xl p-6">
            <p className="text-sm font-semibold opacity-90">Total Blog Posts</p>
            <p className="text-4xl font-black mt-2">
              {JSON.parse(localStorage.getItem('jolihunt_blog_posts') || '[]').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-2xl p-6">
            <p className="text-sm font-semibold opacity-90">Total Users</p>
            <p className="text-4xl font-black mt-2">
              {JSON.parse(localStorage.getItem('jolihunt_users') || '[]').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-2xl p-6">
            <p className="text-sm font-semibold opacity-90">Newsletter Subscribers</p>
            <p className="text-4xl font-black mt-2">1,000+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
