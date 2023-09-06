import React, { useState } from "react";
import axios from "axios";

import { FaUserPlus } from "react-icons/fa6";

export default function AgrearUsuario() {
    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        password: '',
        // admin: false,
        // consultor: true
    });

    const [mensajeError, setMensajeError] = useState(null);

    const agregarUsuarios = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/saveUsuario', datos);

            if (response.status === 200) {
                window.location = '/usuario';
            } else {
                setMensajeError('Ya existe un usuario con ese email');
                return;
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const manejarDatos = e => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const clearDatos = () => {
        setDatos({
            nombre: '',
            email: '',
            password: '',
            // admin: false,
            // consultor: true
        });
    };
    
    return (
        <>
            <button type="button" title="Nuevo Usuario" className="btn btn-outline-dark btn-lg" data-bs-toggle="modal" data-bs-target="#agregarModal">
                <FaUserPlus size={25} />
            </button>
            {/* PENDIENTE LIMPIAR DATOS AL CERRAR LA VENTANA SIN DARLE A LA X */}
            <div className="modal fade modal-lg" id="agregarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearDatos}></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={agregarUsuarios}>
                                <div className="mb-3">
                                    <label for="recipient-name" class="col-form-label">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" required onChange={manejarDatos} value={datos.nombre}/>
                                </div>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Email</label>
                                    <input type="email" className="form-control" name="email" required onChange={manejarDatos} value={datos.email}/>
                                </div>
                                {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Password</label>
                                    <input type="password" className="form-control" name="password" required onChange={manejarDatos} value={datos.password}/>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};