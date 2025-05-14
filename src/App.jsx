import logo from './logo.svg';
import './App.css';
import {MyRoutes} from "./application/router/router.jsx";
import Navbar from "./infraestructure/ui/components/navbar/navbar";

function App() {
  return (
      <>
      <Navbar />
      <MyRoutes/>
      </>
  );
}

export default App;
