import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const titleMap = {
  "/": {
    document: "Lista Dinâmica",
    header: "Boas-vindas à sua lista de tarefas dinâmica",
  },
  "/cadastro": {
    document: "Cadastro",
    header: "Faça seu cadastro",
  },
  "/login": {
    document: "Login",
    header: "Faça seu login",
  },
  "/tarefas": {
    document: "Lista Dinâmica",
    header: "Adicione, atualize ou remova itens.",
  },
  "/admin": {
    document: "Lista Dinâmica",
    header: "Redirecionando para a página de administração.",
  },
  notFound: {
    document: "404 - Not Found",
    header: "404 - Página Não Encontrada",
  },
};

export const useTitle = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    const titles = titleMap[currentPath] || titleMap.notFound;
    
    document.title = titles.document;
    
    setPageTitle(titles.document);
    setHeaderTitle(titles.header);
  }, [location.pathname]);

  return {
    pageTitle,
    headerTitle,
    pathname: location.pathname
  };
};
