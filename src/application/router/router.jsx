import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../../domain/home/Home.jsx";
import {Login} from "../../domain/login/login";
export function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}