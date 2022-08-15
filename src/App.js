import './App.css';
import Home from './Home';
import Login from './Login';
import Login_weak from './Login_weak';
import Signup from './Signup';
import Appbar from './appbar/Appbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Prueba from './Prueba';
import React from 'react';

function App() {

  React.useEffect(() => {
    var data = window.localStorage.getItem("session");
    if(data == null){
      var sesion = {
        conectado: false
      }
      window.localStorage.setItem('session', JSON.stringify(sesion));
    }
  }, []);


  return (
    <Router>
      <Appbar />
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/prueba' element={<Prueba/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/sign-up' element={<Signup/>} />
          <Route exact path='/weak-login' element={<Login_weak/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
