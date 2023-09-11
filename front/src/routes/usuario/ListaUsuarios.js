import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AgregarUsuario from "./AgregarUsuario.js";
import EditarUsuario from "./EditarUsuario.js";
import Swal from 'sweetalert2';

import { FaUserXmark } from "react-icons/fa6";
import NavBar from '../../componentes/NavBar.js';

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);

    const listaUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios');

            const lista = [...response.data];
            setUsuarios(lista);
        } catch (error) {
            console.error(error.message);
        }
    };

    const borrarUsuario = (id) => {
        Swal.fire({
            title: 'Seguro que quieres borrar?',
            text: "Confirma para borrar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    response();
                    async function response() {
                        await axios.delete(`http://localhost:5000/api/deleteUsuario/${id}`);
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Borrado',
                        showConfirmButton: false,
                        timer: 1200
                    })
                    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
                } catch (error) {
                    console.error(error.message);
                }
            }
        })
    };

    useEffect(() => {
        listaUsuarios();
    }, []);

    return (
        <>
            <NavBar /><br />
            <div className="container">
                <div className="d-flex">
                    <AgregarUsuario
                        listaUsuarios={listaUsuarios}
                    />&nbsp;
                    <h1>
                        Usuarios
                    </h1>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Activo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) =>
                            <tr key={usuario.id}>
                                <td>{index + 1}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.activo === true ?
                                    <h5><span class="badge rounded-pill text-bg-success">Si</span></h5>
                                    :
                                    <h5><span class="badge rounded-pill text-bg-danger">No</span></h5>
                                }
                                </td>
                                <td>
                                    <EditarUsuario
                                        usuario={usuario}
                                        listaUsuarios={listaUsuarios}
                                    />&nbsp;
                                    <button title="Borrar" className="btn btn-outline-danger" onClick={() => borrarUsuario(usuario.id)}><FaUserXmark /></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};