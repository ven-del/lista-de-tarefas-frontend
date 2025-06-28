import ListTable from "../components/ListTable";

const ToDoList = () => {
    return ( 
        <div className="flex-1 bg-neutral-900 text-amber-100 p-4 md:p-6">
            <div className="container mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-amber-100">
                    Suas Tarefas
                </h1>
                <ListTable />
            </div>
        </div>
     );
}
 
export default ToDoList;