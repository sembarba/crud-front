import { createContext, useContext, useState } from "react";

import axios from 'axios';

export const UsuarioContext = createContext();

export const useUsuario = () => {
    const context = useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario debe usarse dentro de un UsuarioProvider');
    }
    return context;
};

export function UsuarioProvider({ children }) {
    const [isUsuarioUpdate, setIsUsuarioUpdate] = useState(false);

    return (
        <UsuarioContext.Provider value={{
            isUsuarioUpdate
        }}>
            {children}
        </UsuarioContext.Provider>
    );
};