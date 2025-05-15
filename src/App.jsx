
import './App.css';
import { MyRoutes } from "./application/router/router.jsx";
import  Navbar  from "./infraestructure/ui/components/navbar/navbar.jsx";
import {BrowserRouter} from "react-router-dom"; // Importa correctamente Navbar

function App() {
    return (
        <BrowserRouter>
            <MyRoutes />
        </BrowserRouter>
    );
}

export default App;