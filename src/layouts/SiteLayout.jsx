import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";

const SiteLayout = () => {
    return ( 
        <div className="flex flex-col min-h-screen justify-between">
            <Header />
            <Outlet />
            <Footer />
        </div>
     );
}
 
export default SiteLayout;