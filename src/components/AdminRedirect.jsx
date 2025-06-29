import { useEffect } from 'react';
import { useUser } from './../hooks/useUser';
const AdminRedirect = () => {
    const { isAuthenticated } = useUser();

    useEffect(() => {
        if (isAuthenticated) {
          setTimeout(() => {
            window.location.href = import.meta.env.VITE_BACKEND_URL + '/admin/';
          }, 3000);
        }
      }, [isAuthenticated]);
      
      if (!isAuthenticated) {
        return <div className='h-full min-h-screen bg-neutral-900 text-white text-3xl text-center font-bold flex justify-center items-center'>Você precisa estar logado para acessar o admin.</div>;
    }
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white text-3xl font-bold">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Redirecionando para o painel administrativo...</p>
        </div>
      </div>
    );
}
 
export default AdminRedirect;