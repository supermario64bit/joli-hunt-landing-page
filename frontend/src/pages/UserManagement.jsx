import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User',
    photo: ''
  });

  useEffect(() => {
    const isAdmin = sessionStorage.getItem('jolihunt_admin');
    if (!isAdmin) {
      toast.error('Please login to access admin panel');
      navigate('/admin/login');
      return;
    }

    // Load users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('jolihunt_users') || '[]');
    setUsers(savedUsers);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    const newUser = {
      ...formData,
      id: editingUser ? editingUser.id : Date.now(),
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString()
    };

    let updatedUsers;
    if (editingUser) {
      updatedUsers = users.map(u => u.id === editingUser.id ? newUser : u);
      toast.success('User updated successfully!');
    } else {
      updatedUsers = [...users, newUser];
      toast.success('User added successfully!');
    }

    localStorage.setItem('jolihunt_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setShowModal(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', phone: '', role: 'User', photo: '' });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(u => u.id !== userId);
      localStorage.setItem('jolihunt_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      toast.success('User deleted successfully!');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
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
                <h1 className="text-2xl font-black text-[#1C1C1C]">User Management</h1>
                <p className="text-[#6B6B6B] text-sm">Manage system users</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingUser(null);
                setFormData({ name: '', email: '', phone: '', role: 'User', photo: '' });
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all"
            >
              <Plus className="w-5 h-5" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {users.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#6B6B6B] text-lg">No users yet. Click "Add User" to create one.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100">
                {/* User Photo */}
                <div className="flex justify-center mb-4">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#D4A017]"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#D4A017] flex items-center justify-center text-white text-3xl font-black">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-black text-[#1C1C1C] mb-1">{user.name}</h3>
                  <p className="text-sm text-[#6B6B6B] mb-1">{user.email}</p>
                  <p className="text-sm text-[#6B6B6B] mb-2">{user.phone}</p>
                  <span className="inline-block bg-[#D4A017] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {user.role}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-black text-[#1C1C1C] mb-6">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Preview" className="w-32 h-32 rounded-full object-cover border-4 border-[#D4A017]" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                      <Upload className="w-12 h-12 text-[#6B6B6B]" />
                    </div>
                  )}
                </div>
                <label className="cursor-pointer inline-block bg-[#D4A017] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#B8860B] transition-all">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-[#1C1C1C] mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A017] outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-[#1C1C1C] mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A017] outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-[#1C1C1C] mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A017] outline-none"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-bold text-[#1C1C1C] mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4A017] outline-none"
                >
                  <option>User</option>
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({ name: '', email: '', phone: '', role: 'User', photo: '' });
                  }}
                  className="flex-1 bg-gray-200 text-[#1C1C1C] px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all"
                >
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
