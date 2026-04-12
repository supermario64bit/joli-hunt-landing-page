import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

const UserManagement = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      toast.error('Please login as admin to access this page');
      navigate('/admin/login');
      return;
    }

    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, loading, isAdmin, navigate]);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const usersData = await userAPI.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || (!editingUser && !formData.password)) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (editingUser) {
        // Update user
        const updateData = { name: formData.name, email: formData.email, role: formData.role };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await userAPI.updateUser(editingUser.id, updateData);
        toast.success('User updated successfully!');
      } else {
        // Create user
        await userAPI.createUser(formData);
        toast.success('User added successfully!');
      }

      fetchUsers();
      setShowModal(false);
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '', role: 'user' });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: '', role: user.role });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
        toast.success('User deleted successfully!');
      } catch (error) {
        toast.error(error.response?.data?.detail || 'Failed to delete user');
      }
    }
  };

  if (loading || loadingUsers) {
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
                <p className="text-[#6B6B6B] text-sm">Manage application users</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal(true);
                setEditingUser(null);
                setFormData({ name: '', email: '', password: '', role: 'user' });
              }}
              className="flex items-center gap-2 bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all shadow-lg"
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
            <p className="text-[#6B6B6B] text-lg mb-4">No users yet.</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all"
            >
              Add First User
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#FAFAF8] border-b-2 border-[#D4A017]/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black text-[#1C1C1C]">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-[#1C1C1C]">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-[#1C1C1C]">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-black text-[#1C1C1C]">Created</th>
                  <th className="px-6 py-4 text-right text-sm font-black text-[#1C1C1C]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#D4A017] flex items-center justify-center text-white font-black">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-[#1C1C1C]">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#6B6B6B]">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#6B6B6B] text-sm">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="p-2 text-[#D4A017] hover:bg-[#D4A017] hover:bg-opacity-10 rounded-lg transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          disabled={u.role === 'admin' && u.id === user.id}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-[#1C1C1C] mb-6">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Password {editingUser ? '(leave blank to keep current)' : '*'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1C1C1C] mb-2">
                  Role *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:ring-opacity-20 outline-none transition-all"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                    setFormData({ name: '', email: '', password: '', role: 'user' });
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-[#6B6B6B] rounded-lg font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#D4A017] text-white rounded-lg font-bold hover:bg-[#B8860B] transition-all"
                >
                  {editingUser ? 'Update' : 'Add'} User
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
