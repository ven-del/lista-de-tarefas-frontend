import { Link } from "react-router-dom";

const Header = () => {
    return (
      <header className="flex items-center justify-between bg-neutral-900 text-white p-4 border-b border-amber-100">
        <img src="/assets/images/logo.png" alt="Logo do site Lista Dinâmica" className="w-15 h-15"/>
        <h1>Oi, eu sou o título!</h1>
        <div>
                <Link
                    to="/cadastro"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cadastro
                </Link>
                <Link
                    to="/login"
                    className="bg-amber-100 hover:bg-amber-50 text-white font-bold py-2 px-4 rounded ml-2"
                >
                    Login
                </Link>
        </div>
      </header>
    );
}
 
export default Header;