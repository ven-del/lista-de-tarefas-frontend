import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SiteLayout from "../Layouts/SiteLayout";
import NotFound from "../pages/NotFound";

const Paths = () => {
    return (  
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SiteLayout />} >
                    <Route index element={<Home />} />
                    <Route path="*" element={ <NotFound /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
 
export default Paths;