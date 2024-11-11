import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import context from '../context/context'
import { useEffect, useState } from "react";
import Home from "../pages/Home/Home";
import { Login } from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const RoutesPage = () => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const localstorageGetInformation = JSON.parse(localStorage.getItem('userSection'));
        if (localstorageGetInformation) {
            setUser(localstorageGetInformation);
        }
    }, []);



    const ProtectRoute = ({ children }) => {

        if (user === null) {
            return null
        }

        return user.login ? children : <Navigate to="/" />;
    };

    return (
        <BrowserRouter >
            <Routes >
                <Route element={<Login setUser={setUser} />} path="/" />

                <Route element={<Register setUser={setUser} />} path="/cadastro" />


                <Route element={
                    <context.Provider value={{ user, setUser }} >
                        <ProtectRoute>
                            <Home />
                        </ProtectRoute>
                    </context.Provider>
                } path="/home" />


                <Route element={<Navigate to="/" />} path="/*" />
            </Routes>
        </BrowserRouter>
    )
}