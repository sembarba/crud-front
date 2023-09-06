import { useEffect, useState } from "react";

import { FaUserAlt } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { isAuthenticated, login, errorLogin, mensajeError } = useAuth();
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        email: '',
        password: ''
    });

    const manejarSubmit = async e => {
        e.preventDefault();
        login(datos);
    };

    const manejarDatos = e => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if(isAuthenticated){
            navigate('/inicio');
        }
    }, [isAuthenticated]);

    return (
        <form className="position-absolute top-50 start-50 translate-middle mt-1" onSubmit={manejarSubmit}>
            <div className="card border-success mb-3">
                <div className="card-header text-bg-success"><h2>Iniciar sesión</h2></div>
                <div className="card-body text-success">
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-outline-success" disabled><FaUserAlt /></button>
                        <input type="email" className="form-control" placeholder="Email" name="email" required onChange={manejarDatos} /><br />
                    </div>
                    <div className="input-group mb-3">
                        <button type="button" className="btn btn-outline-success" disabled><FaKey /></button>
                        <input type="password" className="form-control" placeholder="Password" name="password" required onChange={manejarDatos} />
                    </div>
                    {errorLogin && <p style={{color: 'red'}}>{mensajeError}</p> }
                    <button type="submit" className="btn btn-success">Entrar</button>
                </div>
            </div>
        </form>
    );
};