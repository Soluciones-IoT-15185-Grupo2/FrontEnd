import logo from './logo.svg';
import './App.css';
import { MyRoutes } from "./application/router/router.jsx";
import { BrowserRouter } from "react-router-dom";
import  Navbar  from "./infraestructure/ui/components/navbar/navbar.jsx"; // Importa correctamente Navbar

function App() {
    return (
        <>

            <MyRoutes />
        </>
    );
}

export default App;