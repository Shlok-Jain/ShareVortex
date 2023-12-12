import { useContext, useRef } from 'react';
import './App.css';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { Signup } from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route,Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import AppContext from './context/Context';
import { AnimatePresence } from "framer-motion";
import { Home } from './components/Home';
import { useLocation } from 'react-router-dom';

const Animated = () => {
  const location = useLocation();
  return (
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
      </AnimatePresence>
  );
};

function App() {
  const context = useContext(AppContext)
  const { loading_ref } = context;
  
  return (
    <BrowserRouter>
        <div>
        <LoadingBar color='#f11946' ref={loading_ref} />
          <Navbar />
          <Animated />
          {/* <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes> */}
        </div>
    </BrowserRouter>

  );
}

export default App;
