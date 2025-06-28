import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";
import Home from "../pages/Home";
import SiteLayout from "../layouts/SiteLayout";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ToDoList from "../pages/ToDoList";
import PrivateRoute from "../components/PrivateRoute";

const Paths = () => {
    return (  
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={ <SiteLayout /> } >
                        <Route index element={ <Home /> } />
                        <Route path="cadastro" element={ <Register /> } />
                        <Route path="login" element={<Login />} />
                        <Route path="tarefas" element={
                            <PrivateRoute>
                                <ToDoList />
                            </PrivateRoute>
                        } />
                        <Route path="*" element={ <NotFound /> } />
                    </Route>
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}
 
export default Paths;