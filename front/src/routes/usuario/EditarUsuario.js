import React, { useEffect, useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import { FaUserPen } from "react-icons/fa6";

import Swal from 'sweetalert2';

export default function EditarUsuario({ usuario, listaUsuarios }) {
    const [datos, setDatos] = useState({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        activo: usuario.activo,
        // roles: usuario.roles
    });

    const [mensajeError, setMensajeError] = useState(null);

    const editarUsuarios = async e => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/api/updateUsuario/' + datos.id, datos);

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Editado',
                    showConfirmButton: false,
                    timer: 1200
                });
                document.getElementById(`modalId${datos.id}`).click();
                listaUsuarios();
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
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password,
            activo: usuario.activo,
        });
    };

    return (
        <>
            <button type="button" title="Editar Usuario" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target={`#id${datos.id}`}>
                <FaUserPen />
            </button>
            <div className="modal fade modal-lg" id={`id${datos.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar usuario</h1>
                            <button type="button" id={`modalId${datos.id}`} className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearDatos}></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={editarUsuarios}>
                                <div className="mb-3">
                                    <label for="recipient-name" class="col-form-label">Nombre</label>
                                    <input type="text" className="form-control" name="nombre" onChange={manejarDatos} value={datos.nombre} />
                                </div>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Email</label>
                                    <input type="text" className="form-control" name="email" value={datos.email} onChange={manejarDatos} />
                                </div>
                                <div className="mb-3">
                                    <label for="recipient-name" className="col-form-label">Password</label>
                                    <input type="password" className="form-control" name="password" required onChange={manejarDatos} value={datos.password} />
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