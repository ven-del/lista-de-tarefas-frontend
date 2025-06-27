import { useContext } from 'react';
import { UserContext } from '../contexts/UserContextDefinition';

// Hook personalizado para usar o contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
