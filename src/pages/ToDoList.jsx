import ListTable from "../components/ListTable";

const ToDoList = () => {
    return ( 
        <div className="flex flex-col items-center justify-center h-full bg-neutral-900 text-amber-50 text-3xl font-bold">
            <ListTable />
        </div>
     );
}
 
export default ToDoList;