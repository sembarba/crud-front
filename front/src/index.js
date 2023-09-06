import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './routes/Login';
// import Inicio from './routes/Inicio';
import ListaUsuarios from './routes/usuario/ListaUsuarios';
import { AuthProvider } from './context/AuthContext';
// import { UsuarioProvider } from './context/UsuarioContext';

import ProtectedRoute from './routes/ProtectedRoute';
import NavBar from './componentes/NavBar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/inicio",
        element: <NavBar />
      },
      {
        path: "/usuario",
        element:
          // <UsuarioProvider>
            <ListaUsuarios />
          // </UsuarioProvider>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);