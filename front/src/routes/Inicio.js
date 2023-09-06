import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Inicio() {
    return (
        <div className="container">
            <nav className="conteiner navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to='/inicio' className="navbar-brand">Logo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/usuarios' className="nav-link active">Usuarios</Link>
                            </li>
                            {/* <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li> */}
                        </ul>
                        <span className="navbar-text">
                            <Link to='/login' className="btn btn-outline-warning">Cerrar sesión</Link>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    );
};