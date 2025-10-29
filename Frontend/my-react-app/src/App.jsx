import React from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { useHashNavigation } from './hooks/useHashNavigation';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';

// Protected Pages
import { DashboardHome } from './pages/DashboardHome';
import { Notices } from './pages/Notices';
import { Complaints } from './pages/Complaints';
import { Residents } from './pages/Residents';
import { Payments } from './pages/Payments';

function App() {
  const { token, loading } = useAuth();
  const { page, view } = useHashNavigation(token);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Public Routes
  if (!token) {
    switch (page) {
      case 'login':
        return <AuthPage initialView="login" />;
      case 'register':
        return <AuthPage initialView="register" />;
      case 'home':
      default:
        return <LandingPage />;
    }
  }

  // Protected Routes (Logged In)
  // All protected routes use the DashboardLayout
  return (
    <DashboardLayout activeView={view}>
      {(() => {
        switch (view) {
          case 'notices':
            return <Notices />;
          case 'complaints':
            return <Complaints />;
          case 'residents':
            return <Residents />;
          case 'payments':
            return <Payments />;
          case 'dashboard':
          default:
            return <DashboardHome />;
        }
      })()}
    </DashboardLayout>
  );
}

export default App;