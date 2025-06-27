import { useState } from 'react';
import { UserContext } from './UserContextDefinition';

// Provider para a aplicação
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { name: 'Vendel', email: 'vendel@labce.com', password: 'senha123' }
  ]);

  // Adicionar usuário
  const addUser = (newUser) => {
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      console.log('Usuários cadastrados:', updatedUsers);
      return updatedUsers;
    });
  };

  // Checa se já existe email
  const emailExists = (email) => {
    return users.some(user => user.email === email);
  };

  // Autenticação
  const validateLogin = (email, password) => {
    return users.find(user => user.email === email && user.password === password);
  };

  const value = {
    users,
    addUser,
    emailExists,
    validateLogin
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};