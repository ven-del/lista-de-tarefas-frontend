import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SiteLayout = () => {
    return ( 
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
     );
}
 
export default SiteLayout;
