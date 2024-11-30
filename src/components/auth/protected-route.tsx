import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  requiredRole?: 'jobseeker' | 'recruiter';
  children: React.ReactNode;
}

export function ProtectedRoute({ isAuthenticated, requiredRole, children }: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user's role doesn't match, redirect to dashboard
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}