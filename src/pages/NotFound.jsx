import { Link } from "react-router-dom";

const NotFound = () => {
    return (
      <div className="flex flex-col gap-4 text-center bg-neutral-900 text-amber-50 h-full min-h-screen items-center justify-center">
        <h1 className="text-5xl font-bold">404</h1>
        <h2 className="text-4xl font-bold">Página não encontrada</h2>
        <Link
          to="/"
          className="text-xl font-bold hover:underline underline-offset-5"
        >
          Voltar para a página principal
        </Link>
      </div>
    );
}
 
export default NotFound;