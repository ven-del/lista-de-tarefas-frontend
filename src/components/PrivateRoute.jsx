import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useUser();

  // Mostra um loading enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-900 text-amber-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não há usuário autenticado, redireciona para login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Se há usuário autenticado, renderiza o componente filho
  return children;
};

export default PrivateRoute;
