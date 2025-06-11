import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const BlogAdmin = lazy(() => import('../pages/admin/BlogAdmin'));
const BlogEditor = lazy(() => import('../pages/admin/BlogEditor'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));

const AdminRoutes = () => (
  <Suspense fallback={<div className="p-8">Loading...</div>}>
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="blog" element={<BlogAdmin />} />
      <Route path="blog/new" element={<BlogEditor />} />
      <Route path="blog/edit/:id" element={<BlogEditor />} />
    </Routes>
  </Suspense>
);

export default AdminRoutes;
