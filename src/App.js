import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import PrivateRoutes from './components/routes/PrivateRoutes';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/user/Dashboard';

function App() {
  return (
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        {/* Protected Routes */}
        <Route path='/' element={<PrivateRoutes/>}>
        <Route path='/' element={<Dashboard/>}/>
        </Route> 
      </Routes>
     </BrowserRouter>
  );
}

export default App;
