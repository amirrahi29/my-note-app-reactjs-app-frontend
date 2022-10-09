import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import LoginRegister from './components/Login_Register';
import Notes from './components/Notes';
import Profile from './components/Profile';
import UpdateNote from './components/UpdateNote';
import PrivateComponent from './components/PrivateComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='container'>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route element={<PrivateComponent/>}>
              <Route path='/' element={<Notes/>} />
              <Route path='/add_note' element={<AddNote/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/update/:id' element={<UpdateNote/>} />
            </Route>
            <Route path='/login_register' element={<LoginRegister/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
