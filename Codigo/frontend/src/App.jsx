import { Routes, Route } from "react-router-dom";
import Home from "./vistas/Home";
import Boletines from "./vistas/Boletines";
import Navbar from "./components/Navbar";
import Signup from "./vistas/Signup";
import Signin from "./vistas/Signin";
import Perfil from "./vistas/Perfil";
import Panoramas from "./vistas/Panoramas";
import CrearBoletin from "./vistas/EditorView/CrearBoletin";
import Boletin from "./vistas/Boletin";
/* ADMIN */
import Admin from "./vistas/Admin";
import CreateUser from "./vistas/AdminView/CreateUser";

/* EDITOR */
import Editor from "./vistas/Editor";
import CategoriaList from "./vistas/EditorView/CategoriaList";
import CategoriaForm from "./vistas/EditorView/CategoriaForm";
import EtiquetaForm from "./vistas/EditorView/EtiquetaForm";
import EtiquetaList from "./vistas/EditorView/EtiquetaList";
import RegionList from "./vistas/EditorView/RegionList";
import RegionForm from "./vistas/EditorView/RegionForm";
import BoletinList from "./vistas/EditorView/BoletinList";
import ProtectedRoute from "./components/ProtectecRoute";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boletines" element={<Boletines />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/panoramas" element={<Panoramas />} />
        
        <Route path="/boletines/:id" element={<Boletin />} />


        {/*Admins*/}
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Admin /></ProtectedRoute>} />
        <Route path="/admin/create-user" element={<ProtectedRoute roles={['admin']}><CreateUser /></ProtectedRoute>} />

        {/*Editores*/}
        <Route path="/editar" element={<ProtectedRoute roles={['editor']}><Editor /></ProtectedRoute>} />

        <Route path="/editar/boletines/nuevo" element={<ProtectedRoute roles={['admin', 'editor']}><CrearBoletin /></ProtectedRoute>} />
        <Route path="/editar/boletines" element={<ProtectedRoute roles={['admin', 'editor']}><BoletinList /></ProtectedRoute>} />

        <Route path="/editar/regiones" element={<ProtectedRoute roles={['admin', 'editor']}><RegionList /></ProtectedRoute>} />
        <Route path="/editar/regiones/nueva" element={<ProtectedRoute roles={['admin', 'editor']}><RegionForm /></ProtectedRoute>} />
        <Route path="/editar/regiones/editar/:id" element={<ProtectedRoute roles={['admin', 'editor']}><RegionForm /></ProtectedRoute>} />

        <Route path="/editar/etiquetas" element={<ProtectedRoute roles={['admin', 'editor']}><EtiquetaList /></ProtectedRoute>} />
        <Route path="/editar/etiquetas/nueva" element={<ProtectedRoute roles={['admin', 'editor']}><EtiquetaForm /></ProtectedRoute>} />
        <Route path="/editar/etiquetas/editar/:id" element={<ProtectedRoute roles={['admin', 'editor']}><EtiquetaForm /></ProtectedRoute>} />
        
        <Route path="/editar/categorias" element={<ProtectedRoute roles={['admin', 'editor']}><CategoriaList /></ProtectedRoute>} />
        <Route path="/editar/categorias/nueva" element={<ProtectedRoute roles={['admin', 'editor']}><CategoriaForm /></ProtectedRoute>} />
        <Route path="/editar/categorias/editar/:id" element={<ProtectedRoute roles={['admin', 'editor']}><CategoriaForm /></ProtectedRoute>} />

      </Routes>
    </div>
  );
}

export default App;