import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div className="bg-neutral-900 h-full text-amber-50 flex justify-center items-center">
        <h1 className="text-center">
          Você deve{" "}
          <Link to="/cadastro" className="hover:underline underline-offset-4">
            cadastrar-se
          </Link>{" "}
          ou fazer o{" "}
          <Link to="/login" className="hover:underline underline-offset-4">
            login
          </Link>{" "}
          para acessar o sistema.
        </h1>
      </div>
    );
}
 
export default Home;