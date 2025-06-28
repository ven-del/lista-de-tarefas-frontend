import { BsFillTrashFill } from "react-icons/bs";

const ListItem = ({ task, index, onToggleComplete, onDelete }) => {
  // Alterna a cor de fundo baseado no índice (zebrado)
  const bgColor = index % 2 === 0 ? "bg-neutral-900" : "bg-neutral-800";

  return (
    <div
      className={`flex items-center justify-between p-4 border-b border-neutral-700 ${bgColor}`}
    >
      
      
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
        <p className="font-medium">{task.name}</p>
      </div>
      {/* Data de entrega */}
      <div className="w-40 px-4 text-center">
        <p className="text-amber-100">{task.dueDate}</p>
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
  );
};

export default ListItem;
