import { useContext, useRef } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Signup } from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import AppContext from './context/Context';

function App() {
  const context = useContext(AppContext)
  const { loading_ref } = context;
  
  return (
    <BrowserRouter>
        <div>
        <LoadingBar color='#f11946' ref={loading_ref} />
          <Navbar />
          <Routes>
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
        </div>
    </BrowserRouter>

  );
}

export default App;
