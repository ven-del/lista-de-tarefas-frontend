import { BsFillTrashFill } from "react-icons/bs";

const ListItem = ({ task, index, onToggleComplete, onDelete }) => {
  // Alterna a cor de fundo baseado no índice (zebrado)
  const bgColor = index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800";

  return (
    <div
      className={`p-4 border-b border-neutral-700 ${bgColor}`}
    >
      {/* Layout para telas grandes */}
      <div className="hidden md:flex items-center justify-between">
        {/* Checkbox pra concluído */}
        <div className="flex items-center justify-center w-24">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="w-5 h-5 text-amber-500 bg-neutral-700 border-neutral-600 rounded focus:ring-amber-500 focus:ring-2"
          />
        </div>
        {/* Nome da tarefa */}
        <div
          className={`flex-1 px-4 ${
            task.completed ? "line-through text-neutral-500" : "text-amber-100"
          }`}
        >
          <p className="font-medium">{task.title}</p>
        </div>
        {/* Data de entrega */}
        <div className="w-40 px-4 text-center">
          <p className="text-amber-100">{task.description}</p>
        </div>
        {/* Botão de excluir */}
        <div className="w-20 flex justify-center">
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-400 transition-colors duration-200 p-2 rounded-full hover:bg-neutral-700"
            title="Excluir tarefa"
          >
          <BsFillTrashFill 
              color="red"
              className="cursor-pointer w-5 h-5"
          />
          </button>
        </div>
      </div>

      {/* Layout para telas pequenas */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="w-5 h-5 text-amber-500 bg-neutral-700 border-neutral-600 rounded focus:ring-amber-500 focus:ring-2"
            />
            <span className="text-sm text-amber-200">Concluído</span>
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-400 transition-colors duration-200 p-2 rounded-full hover:bg-neutral-700"
            title="Excluir tarefa"
          >
            <BsFillTrashFill 
                color="red"
                className="cursor-pointer w-4 h-4"
            />
          </button>
        </div>
        <div
          className={`${
            task.completed ? "line-through text-neutral-500" : "text-amber-100"
          }`}
        >
          <p className="font-medium text-lg">{task.title}</p>
        </div>
        <div className="text-amber-100">
          <span className="text-sm text-amber-200">Data de Entrega: </span>
          <span>{task.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
