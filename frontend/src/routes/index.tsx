import { Navigate } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';

export const routes = [
  { path: '/', element: <DashboardPage />, private: true, name: 'Dashboard' }
];

export function PrivateRoute({ element, isAuthenticated }: { element: JSX.Element; isAuthenticated: boolean }) {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}
