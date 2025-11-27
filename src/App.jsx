import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LoginForm } from './components/LoginForm';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { QuestionsPage } from './components/QuestionsPage';
import { RevisionPage } from './components/RevisionPage';

function ProtectedRoute({ children }) {
  const { user, initializing } = useApp();
  
  if (initializing) return null;
  return user ? children : <Navigate to="/login" replace />;
}


function AppRoutesInner() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <Layout>
                <QuestionsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/revision"
          element={
            <ProtectedRoute>
              <Layout>
                <RevisionPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function AppRoutes() {
  return (
    <AppProvider>
      <AppRoutesInner />
    </AppProvider>
  );
}