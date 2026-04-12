import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

// Lazy load pages for better performance
const LandingPage = lazy(() => import("./pages/LandingPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminBlogPage = lazy(() => import("./pages/AdminBlogPage"));
const BlogManagement = lazy(() => import("./pages/BlogManagement"));
const UserManagement = lazy(() => import("./pages/UserManagement"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-[#6B6B6B] font-semibold">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/blog/create" element={<AdminBlogPage />} />
            <Route path="/admin/blog/manage" element={<BlogManagement />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
