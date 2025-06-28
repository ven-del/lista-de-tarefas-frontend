import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Register = () => {
const [toast, setToast] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);
const { registerUser } = useUser();
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Os dados do formulário
      const formData = new FormData(e.target);
      const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      };

      // Registra o usuário usando o contexto que chama a API
      const result = await registerUser(userData);
      
      if (result.success) {
        setToast({ type: 'success', message: 'Cadastro realizado com sucesso! Você será redirecionado à tela de login em 3 segundos.' });
        
        // Redireciona para login depois de 3 segundos
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setToast({ type: 'error', message: result.error || 'Erro ao realizar cadastro. Tente novamente.' });
        setTimeout(() => {
          setToast(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setToast({ type: 'error', message: 'Erro ao realizar cadastro. Tente novamente.' });
      setTimeout(() => {
        setToast(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-neutral-900 text-amber-100 relative">
      {toast && (
        <div className={`fixed top-25 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 ${
          toast.type === 'success' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {toast.type === 'success' ? '✓' : '✗'}
            </span>
            <p>{toast.message}</p>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">Cadastro</h1>
      <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full text-white font-bold py-2 px-4 rounded transition cursor-pointer active:scale-95 duration-150 ${
            isSubmitting 
              ? 'bg-gray-500 cursor-wait' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
