import { Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from '../pages/Hero';
import Login from '../pages/Login';
import { Profile } from '../pages/Profile';
import { ProductList } from '../pages/ProductList';
import { ProductDetail } from '../pages/ProductDetail';
import { useAuthStore } from '../store/authStore';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Componente para rotas públicas apenas para não autenticados
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/profile" />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />

      {/* Rota fallback para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
