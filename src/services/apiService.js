// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Pegar o token no localStorage
const getAuthToken = () => {
  return localStorage.getItem('access_token');
};

// Headers padrão
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Tratamento de respostas da API
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// Autenticação
export const authService = {
  // Cadastro
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Logout
  logout: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    return handleResponse(response);
  },

  // Buscar pelo perfil
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

// Atualizar perfil do usuário caso for adicionado no futuro

//   updateProfile: async (userData) => {
//     const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
//       method: 'PATCH',
//       headers: getHeaders(true),
//       body: JSON.stringify(userData),
//     });
//     return handleResponse(response);
//   },

  // Refresh padrão do token
  refreshToken: async (refreshToken) => {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ refresh: refreshToken }),
    });
    return handleResponse(response);
  },
};

// CRUD básico
export const taskService = {
  getTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },


  createTask: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  getTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    return handleResponse(response);
  },

  updateTask: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  patchTask: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  deleteTask: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    
    if (response.status === 204) {
      return { message: 'Tarefa excluída com sucesso!' };
    }
    
    return handleResponse(response);
  },
};

// Gerenciar os tokens
export const tokenUtils = {
  saveTokens: (tokens) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  },

  getTokens: () => {
    return {
      access: localStorage.getItem('access_token'),
      refresh: localStorage.getItem('refresh_token'),
    };
  },

  clearTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  hasValidToken: () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },
};



// Refresh do token se o erro for 401
export const handleApiError = async (error, retryFunction = null) => {
  if (error.message.includes('401') && retryFunction) {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const response = await authService.refreshToken(refreshToken);
        tokenUtils.saveTokens(response.tokens || { access: response.access, refresh: refreshToken });
        
        return await retryFunction();
      }
    } catch (refreshError) {
      tokenUtils.clearTokens();
      window.location.href = '/login';
      throw new Error('Sessão expirada. Faça login novamente.');
    }
  }
  
  throw error;
};
