import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../../domain/home/Home.jsx";
import {Login} from "../../domain/login/login.jsx";
import {Register} from "../../domain/register/register";
export function MyRoutes() {
    return (

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

    );
}