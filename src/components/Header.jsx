import { Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";

const Header = () => {
    const { headerTitle } = useTitle();

    return (
      <header className="flex items-center justify-between bg-neutral-900 text-white p-4 border-b border-amber-100">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.png"
            alt="Logo do site Lista Dinâmica"
            className="w-15 h-15"
          />
          <h1 className="text-2xl font-bold">Lista Dinâmica</h1>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold text-amber-100">
            {headerTitle}
          </h1>
        </div>
        <div>
          <Link
            to="/cadastro"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Cadastro
          </Link>
          <Link
            to="/login"
            className="bg-amber-500 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Login
          </Link>
        </div>
      </header>
    );
}
 
export default Header;