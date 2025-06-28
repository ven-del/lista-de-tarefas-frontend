import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { BsFloppyFill } from "react-icons/bs";
import { taskService } from "../services/apiService";

const ListTable = () => {
  // Estados para controlar o formulário de nova tarefa
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar tarefas quando o componente montar
  useEffect(() => {
    loadTasks();
  }, []);

  // Função para carregar tarefas da API
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
      setError("Erro ao carregar tarefas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Alternar o status de conclusão
  const handleToggleComplete = async (taskId) => {
    try {
      // Encontra a tarefa para pegar os dados atuais
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      // Atualiza a tarefa via API
      const response = await taskService.updateTask(taskId, {
        ...task,
        completed: !task.completed,
      });
      const updatedTask = response.task;

      // Atualiza o estado local
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (err) {
      console.error("Erro ao alterar status da tarefa:", err);
      setError("Erro ao alterar status da tarefa.");
    }
  };

  // Excluir tarefa
  const handleDeleteTask = async (taskId) => {
    try {
      // Exclui a tarefa via API
      await taskService.deleteTask(taskId);

      // Remove do estado local
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      setError("Erro ao excluir tarefa.");
    }
  };

  // Função para adicionar nova tarefa
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim() || !newTaskDescription.trim()) {
      return; // Não adiciona se campos estiverem vazios
    }

    setIsSubmitting(true);

    try {
      // Cria nova tarefa via API
      const response = await taskService.createTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
      });
      const newTask = response.task;

      // Adiciona nova tarefa no topo da lista
      setTasks((prevTasks) => [newTask, ...prevTasks]);

      // Limpa o formulário e fecha
      setNewTaskTitle("");
      setNewTaskDescription("");
      setShowAddForm(false);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError("Erro ao adicionar tarefa.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para cancelar adição
  const handleCancelAdd = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setShowAddForm(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-6">
      {/* Mensagem de erro */}
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Botão para adicionar nova tarefa */}
      <div className="mb-6 flex justify-center md:justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-amber-50 font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg cursor-pointer"
        >
          <BsFloppyFill className="text-lg" />
          {showAddForm ? "Cancelar" : "Nova Tarefa"}
        </button>
      </div>

      {/* Formulário para adicionar nova tarefa */}
      {showAddForm && (
        <div className="mb-6 bg-neutral-800 p-6 rounded-lg border border-amber-500">
          <h3 className="text-lg font-bold text-amber-100 mb-4">
            Adicionar Nova Tarefa
          </h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Input título da tarefa */}
              <div>
                <label
                  htmlFor="taskTitle"
                  className="block text-sm font-medium text-amber-100 mb-2"
                >
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  id="taskTitle"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100"
                  placeholder="Digite o título da tarefa..."
                  required
                />
              </div>

              {/* Input descrição */}
              <div>
                <label
                  htmlFor="taskDescription"
                  className="block text-sm font-medium text-amber-100 mb-2"
                >
                  Data de Entrega *
                </label>
                <input
                  type="text"
                  id="taskDescription"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100"
                  placeholder="Digite quando deverá ser entregue..."
                  required
                />
              </div>
            </div>

            {/* Botões do formulário */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={handleCancelAdd}
                className="px-6 py-2 bg-neutral-600 hover:bg-neutral-700 text-white rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !newTaskTitle.trim() ||
                  !newTaskDescription.trim()
                }
                className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${
                  isSubmitting ||
                  !newTaskTitle.trim() ||
                  !newTaskDescription.trim()
                    ? "bg-gray-500 cursor-not-allowed text-gray-300"
                    : "bg-amber-500 hover:bg-amber-600 text-amber-50 cursor-pointer"
                }`}
              >
                {isSubmitting ? "Salvando..." : "Salvar Tarefa"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cabeçalho da tabela, info fixa */}
      <div className="hidden md:flex items-center justify-between p-4 bg-neutral-800 border-b-2 border-amber-500 text-amber-100 font-bold">
        <div className="w-24 text-center">Concluído</div>
        <div className="flex-1 px-4">Tarefa</div>
        <div className="w-40 px-4 text-center">Data da Entrega</div>
        <div className="w-20 text-center">Excluir</div>
      </div>

      {/* Lista de tarefas */}
      <div className="bg-neutral-900 rounded-b-lg shadow-lg">
        {loading ? (
          <div className="p-8 text-center text-amber-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p>Carregando tarefas...</p>
          </div>
        ) : tasks.length > 0 ? (
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
};

export default ListTable;
