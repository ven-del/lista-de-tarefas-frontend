import { useState } from 'react';
import ListItem from './ListItem';
import { BsFloppyFill } from "react-icons/bs";

const ListTable = () => {
    // Estados para controlar o formulário de nova tarefa
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDueDate, setNewTaskDueDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Array inicial de 10 tarefas para demonstração
    // Vai ser substituído quando a API vier
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Implementar sistema de autenticação',
            dueDate: 'Essa semana',
            completed: false
        },
        {
            id: 2,
            name: 'Criar componentes da lista de tarefas',
            dueDate: 'Depois de amanhã',
            completed: true
        },
        {
            id: 3,
            name: 'Configurar banco de dados',
            dueDate: 'Hoje de noite',
            completed: false
        },
        {
            id: 4,
            name: 'Desenvolver API REST',
            dueDate: 'Próximo domingo',
            completed: false
        },
        {
            id: 5,
            name: 'Implementar validação de formulários',
            dueDate: 'Segunda passada',
            completed: true
        },
        {
            id: 6,
            name: 'Criar testes unitários',
            dueDate: '31 de fevereiro',
            completed: false
        },
        {
            id: 7,
            name: 'Configurar deploy da aplicação',
            dueDate: '05 de janeiro',
            completed: false
        },
        {
            id: 8,
            name: 'Documentar código e APIs',
            dueDate: 'No dia dos pais',
            completed: false
        },
        {
            id: 9,
            name: 'Realizar testes de integração',
            dueDate: 'O mais rápido possível',
            completed: false
        },
        {
            id: 10,
            name: 'Preparar apresentação final',
            dueDate: 'Domingo, se Deus quiser',
            completed: false
        }
    ]);

    // Alternar o status de conclusão
    const handleToggleComplete = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Excluir tarefa
    const handleDeleteTask = (taskId) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    // Função para adicionar nova tarefa
    const handleAddTask = async (e) => {
        e.preventDefault();
        
        if (!newTaskName.trim() || !newTaskDueDate.trim()) {
            return; // Não adiciona se campos estiverem vazios
        }

        setIsSubmitting(true);

        try {
            // Simula delay da API
            await new Promise(resolve => setTimeout(resolve, 500));

            // Gera novo ID (maior ID existente + 1)
            const newId = Math.max(...tasks.map(task => task.id), 0) + 1;

            const newTask = {
                id: newId,
                name: newTaskName.trim(),
                dueDate: newTaskDueDate.trim(),
                completed: false
            };

            // Adiciona nova tarefa no topo da lista
            setTasks(prevTasks => [newTask, ...prevTasks]);

            // Limpa o formulário e fecha
            setNewTaskName('');
            setNewTaskDueDate('');
            setShowAddForm(false);

        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Função para cancelar adição
    const handleCancelAdd = () => {
        setNewTaskName('');
        setNewTaskDueDate('');
        setShowAddForm(false);
    };

    return (
      <div className="w-full max-w-6xl mx-auto pb-6">
        {/* Botão para adicionar nova tarefa */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-amber-50 font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg cursor-pointer"
          >
            <BsFloppyFill className="text-lg" />
            {showAddForm ? 'Cancelar' : 'Nova Tarefa'}
          </button>
        </div>

        {/* Formulário para adicionar nova tarefa */}
        {showAddForm && (
          <div className="mb-6 bg-neutral-800 p-6 rounded-lg border border-amber-500">
            <h3 className="text-lg font-bold text-amber-100 mb-4">Adicionar Nova Tarefa</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input nome da tarefa */}
                <div>
                  <label htmlFor="taskName" className="block text-sm font-medium text-amber-100 mb-2">
                    Nome da Tarefa *
                  </label>
                  <input
                    type="text"
                    id="taskName"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100"
                    placeholder="Digite o nome da tarefa..."
                    required
                  />
                </div>

                {/* Input data de entrega */}
                <div>
                  <label htmlFor="taskDueDate" className="block text-sm font-medium text-amber-100 mb-2">
                    Data de Entrega *
                  </label>
                  <input
                    type="text"
                    id="taskDueDate"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100"
                    placeholder="Ex: Amanhã, 15/01/2025, Esta semana..."
                    required
                  />
                </div>
              </div>

              {/* Botões do formulário */}
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="px-6 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newTaskName.trim() || !newTaskDueDate.trim()}
                  className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${
                    isSubmitting || !newTaskName.trim() || !newTaskDueDate.trim()
                      ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                      : 'bg-amber-500 hover:bg-amber-600 text-amber-50 cursor-pointer'
                  }`}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Tarefa'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cabeçalho da tabela, info fixa */}
        <div className="flex items-center justify-between p-4 bg-neutral-800 border-b-2 border-amber-500 text-amber-100 font-bold">
          <div className="w-24 text-center">Concluído</div>
          <div className="flex-1 px-4">Tarefa</div>
          <div className="w-40 px-4 text-center">Data da entrega</div>
          <div className="w-20 text-center">Excluir</div>
        </div>

        {/* Lista de tarefas */}
        <div className="bg-neutral-900 rounded-b-lg shadow-lg">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <ListItem
                key={task.id}
                task={task}
                index={index}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            <div className="p-8 text-center text-neutral-400">
              <p className="text-lg">Nenhuma tarefa encontrada.</p>
              <p className="text-sm mt-2">
                Adicione uma nova tarefa para começar!
              </p>
            </div>
          )}
        </div>
      </div>
    );
}
 
export default ListTable;