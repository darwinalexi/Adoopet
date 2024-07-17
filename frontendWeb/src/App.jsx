import { Route, BrowserRouter as  Router, Routes, } from 'react-router-dom'
import './App.css'
import Login from './pages/Auth/Login'
import Pets from './pages/Pets'
import Create_Pets from './pages/Createp'
import Sow_pet from './pages/Sow_pet'
import Petsnadop from './pages/Petsnadop'
import Perfil from './pages/Perfil'

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route  path='/' Component={Login} />
      <Route path='/mascotap' Component={Sow_pet}/>
      <Route path='/mascotas_adoptadas' Component={Pets}/>
      <Route path='/crear_mascota' Component={Create_Pets}/>
      <Route path='/mascotas_por_adoptar' Component={Petsnadop}/>
      <Route path='Perfil' Component={Perfil}/>
    
      </Routes>
    </Router>
   </>
  )
}

export default App
