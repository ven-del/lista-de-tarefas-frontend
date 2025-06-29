import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Login = () => {
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Captura os dados do formulário
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');

      // Faz login usando o contexto que chama a API
      const result = await loginUser({ email, password });
      
      if (result.success) {
        setToast({ type: 'success', message: `Boas-vindas, ${result.data?.user?.name || ''}! Redirecionando para a página inicial...` });
        
        // Redireciona para home depois de 2 segundos
        setTimeout(() => {
          navigate('/tarefas');
        }, 2000);
      } else {
        setToast({ type: 'error', message: result.error || 'Email ou senha incorretos.' });
        
        // Remove o toast depois de 5 segundos
        setTimeout(() => {
          setToast(null);
        }, 5000);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setToast({ type: 'error', message: 'Erro ao fazer login. Tente novamente.' });
      
      // Remove o toast depois de 5 segundos
      setTimeout(() => {
        setToast(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-neutral-900 text-amber-100 relative">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-25 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-blue-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center">
            <span className="mr-2">{toast.type === "success" ? "✓" : "✗"}</span>
            <p>{toast.message}</p>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
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
          className={`w-full text-white font-bold py-2 px-4 rounded transition-colors duration-150 ${
            isSubmitting
              ? "bg-gray-500 cursor-wait"
              : "bg-blue-500 hover:bg-blue-600 active:scale-95"
          }`}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
