import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Auth/Login';
import Pets from './pages/Pets';
import Create_Pets from './pages/Createp';
import Sow_pet from './pages/Sow_pet';
import Petsnadop from './pages/Petsnadop';
import Perfil from './pages/Perfil';
import Adoptar from './pages/Adopt';
import { PrivateRouter } from './pages/Router/PrivateRouter';
import Categorias from './pages/Categorias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<PrivateRouter />}>
            <Route path="mascotap" element={<Sow_pet />} />
            <Route path="crear_mascota" element={<Create_Pets />} />
            <Route path="mascotas_por_adoptar" element={<Petsnadop />} />
            <Route path="mascotas_adoptadas" element={<Pets />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="adoptar" element={<Adoptar />} />
            <Route path='categorias' element={<Categorias/>}/>
        </Route>
        {/* Redireccionamiento para rutas no coincidentes */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;






