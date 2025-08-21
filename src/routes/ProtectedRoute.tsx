import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

type UserRole = 'customer' | 'employee' | 'manager' | 'admin' | 'franchisee';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole[];
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role && !requiredRole.includes(role as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
