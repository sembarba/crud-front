import { createContext, useContext, useEffect, useState } from "react";
import cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    const login = async (datos) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', datos, { withCredentials: true });

            if (response.data.ok) {
                setUser(response.data);
                setIsAuthenticated(true);
                setErrorLogin(false);
                setMensajeError('');
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setErrorLogin(true);
                setMensajeError('Usuario o password incorrecto');
                return;
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            setErrorLogin(true);
            setMensajeError('Usuario o password incorrecto');
            console.error(error.message);
        }
    };

    const logout = () => {
        cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const verificaLogin = async () => {
            const cookie = cookies.get();
            if (cookie.token) {
                try {
                    const res = await axios.post('http://localhost:5000/api/verifyToken', cookie);

                    if (!res.data) {
                        setUser(null);
                        setIsAuthenticated(false);
                        setErrorLogin(true);
                        setMensajeError('Usuario o password incorrecto');
                    }

                    setUser(res.data);
                    setIsAuthenticated(true);
                    setErrorLogin(false);
                    setMensajeError('');
                } catch (error) {
                    setUser(null);
                    setIsAuthenticated(false);
                    setErrorLogin(true);
                    setMensajeError('Usuario o password incorrecto');
                }
            }
        };
        verificaLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            login,
            isAuthenticated,
            errorLogin,
            mensajeError,
            user,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};