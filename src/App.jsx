import logo from './logo.svg';
import './App.css';
import {MyRoutes} from "./application/router/router.jsx";
import HarmonyNav from "./infraestructure/ui/components/navbar";

function App() {
  return (
      <>
      <HarmonyNav />
      <MyRoutes/>
      </>
  );
}

export default App;
