# Lista de Tarefas - Frontend

Interface moderna desenvolvida com React e Vite para gerenciamento de tarefas, integrada com API Django REST Framework.

## 🚀 Tecnologias Utilizadas

- **React 19.1.0** - Biblioteca para construção de interfaces de usuário
- **Vite 7.0.0** - Build tool moderna e rápida para desenvolvimento
- **React Router DOM 7.6.3** - Roteamento para Single Page Applications
- **Tailwind CSS 4.1.11** - Framework CSS utilitário para estilização
- **React Icons 5.5.0** - Biblioteca de ícones para React
- **Context API** - Gerenciamento de estado nativo do React

## 📁 Estrutura do Projeto

```bash
lista-de-tarefas-frontend/
├── public/                       # Arquivos públicos
│   └── assets/                   # Imagens e recursos estáticos
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── Footer.jsx           # Rodapé da aplicação
│   │   ├── Header.jsx           # Cabeçalho da aplicação
│   │   ├── ListItem.jsx         # Item individual da lista
│   │   ├── ListTable.jsx        # Tabela de tarefas
│   │   └── PrivateRoute.jsx     # Componente para rotas protegidas
│   ├── contexts/                 # Context API para estado global
│   │   ├── UserContext.jsx      # Contexto de usuário e autenticação
│   │   ├── UserContextDefinition.js
│   │   ├── ToastContext.jsx     # Contexto para notificações
│   │   └── ToastContextDefinition.js
│   ├── hooks/                    # Custom hooks
│   │   ├── useTitle.js          # Hook para gerenciar título da página
│   │   ├── useUser.js           # Hook para contexto de usuário
│   │   └── useToast.js          # Hook para notificações
│   ├── layouts/                  # Layouts da aplicação
│   │   └── SiteLayout.jsx       # Layout principal
│   ├── pages/                    # Páginas da aplicação
│   │   ├── Home.jsx             # Página inicial
│   │   ├── Login.jsx            # Página de login
│   │   ├── Register.jsx         # Página de registro
│   │   ├── ToDoList.jsx         # Página de lista de tarefas
│   │   └── NotFound.jsx         # Página 404
│   ├── routes/                   # Configuração de rotas
│   │   └── Paths.jsx            # Definição das rotas
│   ├── services/                 # Serviços de integração
│   │   └── apiService.js        # Configuração da API e requests
│   ├── styles/                   # Estilos CSS
│   │   └── main.css             # Estilos principais
│   ├── App.jsx                   # Componente raiz
│   └── main.jsx                  # Ponto de entrada da aplicação
├── index.html                    # Template HTML
├── package.json                  # Dependências e scripts
├── vite.config.js               # Configuração do Vite
└── eslint.config.js             # Configuração do ESLint
```

## ✨ Funcionalidades

### 🔐 Autenticação

- **Registro de usuários** com validação em tempo real
- **Login/Logout** com persistência de sessão
- **Proteção de rotas** privadas
- **Redirecionamento automático** após autenticação

### 📝 Gerenciamento de Tarefas

- **Visualização** de todas as tarefas do usuário
- **Criação** de novas tarefas
- **Marcação** de tarefas como concluídas/pendentes
- **Exclusão** de tarefas
- **Interface responsiva** para todos os dispositivos

### 🎨 Interface e UX

- **Design moderno** com Tailwind CSS
- **Tema escuro** com cores consistentes
- **Estados de loading** durante operações
- **Notificações toast** para feedback
- **Tratamento de erros** com mensagens amigáveis

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- **Node.js 18+** instalado
- **npm** (gerenciador de pacotes Node.js)
- **Backend da API** rodando em `http://127.0.0.1:8000`

### 📦 Instalação e Configuração

1. **Clone o repositório** (se ainda não tiver):

   ```bash
   git clone <url-do-repositorio>
   cd lista-de-tarefas-frontend
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**:
   - Frontend: `http://localhost:5173/`

### 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção

# Qualidade de código
npm run lint         # Executa ESLint para verificar código
```

## 🔗 Integração com Backend

A aplicação se comunica com a API Django através do arquivo `src/services/apiService.js`:

### Configuração da API

```javascript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Endpoints Utilizados

- **Autenticação**: `/auth/register/`, `/auth/login/`, `/auth/logout/`
- **Tarefas**: `/tasks/` (GET, POST, PUT, PATCH, DELETE)

### Autenticação JWT

- Tokens são armazenados no `localStorage`
- Refresh automático de tokens
- Headers de autorização incluídos automaticamente

## 📱 Páginas da Aplicação

### `/` - Home

Página inicial com navegação para login/registro

### `/login` - Login

- Formulário de autenticação
- Validação de campos
- Redirecionamento após login

### `/cadastro` - Registro

- Formulário de registro de usuário
- Validação de campos
- Redirecionamento após cadastro

### `/tarefas` - Lista de Tarefas (Protegida)

- Visualização de todas as tarefas
- Criação de novas tarefas
- Edição de status das tarefas
- Exclusão de tarefas

## 🎨 Design System

### Cores Principais

- **Background**: Tons de cinza escuro (`neutral-900`, `neutral-800`)
- **Accent**: Âmbar (`amber-500`, `amber-600`)
- **Text**: Âmbar claro (`amber-100`)
- **Success**: Verde (`green-500`)
- **Error**: Vermelho (`red-500`)

### Componentes

- **Botões**: Estilizados com Tailwind e efeitos hover
- **Formulários**: Inputs com foco em amber
- **Cards**: Background neutral com bordas amber
- **Loading**: Spinners animados

## 🔒 Segurança

- **Proteção de rotas** com `PrivateRoute`
- **Validação de tokens** JWT
- **Limpeza de dados** sensíveis no logout
- **Sanitização** de entradas de usuário

## 🚀 Build para Produção

### Gerar Build

```bash
npm run build
```

### Deploy

Os arquivos de build estarão na pasta `dist/` e podem ser servidos por qualquer servidor web estático:

```bash
# Exemplo com servidor HTTP simples
npx serve dist

# Ou copiar para servidor web
cp -r dist/* /var/www/html/
```

### Variáveis de Ambiente (Produção)

```bash
# .env.production
VITE_API_BASE_URL=https://sua-api.com/api
```

## 🛠️ Desenvolvimento

### Estrutura de Componentes

- **Componentes funcionais** com hooks
- **Props tipadas** com PropTypes (opcional)
- **Context API** para estado global
- **Custom hooks** para lógica reutilizável

### Convenções de Código

- **PascalCase** para componentes
- **camelCase** para funções e variáveis
- **kebab-case** para arquivos CSS
- **Imports organizados** por tipo

### ESLint e Formatação

- Configuração ESLint para React
- Regras para hooks e JSX
- Verificação automática de código

## 🤝 Contribuindo

1. Faça um **fork** do projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/NovaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add: Nova feature'`)
4. **Push** para a branch (`git push origin feature/NovaFeature`)
5. Abra um **Pull Request**

---

## **Interface desenvolvida com ❤️ usando React e Vite | Documentação criada por Copilot**
