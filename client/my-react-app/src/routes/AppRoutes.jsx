import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes 
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<MyTasks />} />
        <Route path="projects" element={<Projects />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="reports" element={<Reports />} />
      </Route>
      <Route path="*" element={<NotFound />} />

      {/* 404 */}
      
    </Routes>

    


  );
};

export default AppRoutes;