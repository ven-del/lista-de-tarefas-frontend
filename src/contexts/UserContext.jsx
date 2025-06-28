import { useState, useEffect } from 'react';
import { UserContext } from './UserContextDefinition';
import { authService, tokenUtils, handleApiError } from '../services/apiService';

// Provider para a aplicação
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Verificar autenticação na inicialização
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      
      if (tokenUtils.hasValidToken()) {
        // Busca pelo usuário e valida o token
        const userProfile = await authService.getProfile();
        setCurrentUser(userProfile);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Token inválido ou erro na API
      console.error('Erro ao verificar autenticação:', error);
      tokenUtils.clearTokens();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Cadastro
  const registerUser = async (userData) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      const response = await authService.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.password
      });

      // Autenticação do usuário criado
      if (response.tokens) {
        tokenUtils.saveTokens(response.tokens);
        setCurrentUser(response.user);
        setIsAuthenticated(true);
      }

      return { success: true, data: response };
    } catch (error) {
      console.error('Erro no registro:', error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const loginUser = async (credentials) => {
    try {
      setIsLoading(true);
      setAuthError(null);
      
      const response = await authService.login({
        email: credentials.email,
        password: credentials.password
      });

      // Autentica o usuário
      if (response.tokens) {
        tokenUtils.saveTokens(response.tokens);
        setCurrentUser(response.user);
        setIsAuthenticated(true);
      }

      return { success: true, data: response };
    } catch (error) {
      console.error('Erro no login:', error);
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logoutUser = async () => {
    try {
      const tokens = tokenUtils.getTokens();
      
      if (tokens.refresh) {
        // Tenta fazer logout no servidor (blacklist do token)
        await handleApiError(
          () => authService.logout(tokens.refresh),
          () => authService.logout(tokens.refresh)
        );
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      // Limpa os dados locais se der erro
    } finally {
      // Limpa os dados locais
      tokenUtils.clearTokens();
      setCurrentUser(null);
      setIsAuthenticated(false);
      setAuthError(null);
    }
  };

  // Atualizar perfil do usuário - mesma coisa do service: pra caso seja implementado no futuro

  // const updateUserProfile = async (userData) => {
  //   try {
  //     setIsLoading(true);
  //     setAuthError(null);
      
  //     const response = await handleApiError(
  //       () => authService.updateProfile(userData),
  //       () => authService.updateProfile(userData)
  //     );

  //     setCurrentUser(response.user);
  //     return { success: true, data: response };
  //   } catch (error) {
  //     console.error('Erro ao atualizar perfil:', error);
  //     setAuthError(error.message);
  //     return { success: false, error: error.message };
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Verificar se email já existe (mantido para compatibilidade)
  const emailExists = async (email) => {
    // Esta função agora é tratada pelo backend na validação
    // Retorna false para permitir que o backend faça a validação
    return false;
  };

  // Validar login - agora usa a API
  const validateLogin = async (email, password) => {
    const result = await loginUser({ email, password });
    return result.success ? result.data.user : null;
  };

  // Função para adicionar usuário - agora usa a API
  const addUser = async (userData) => {
    return await registerUser(userData);
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    authError,
    
    // Funções principais
    registerUser,
    loginUser,
    logoutUser,
    checkAuthStatus,
    
    // Funções para compatibilidade com código existente
    addUser,
    emailExists,
    validateLogin,
    
    // Estados para compatibilidade
    users: currentUser ? [currentUser] : [],
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};