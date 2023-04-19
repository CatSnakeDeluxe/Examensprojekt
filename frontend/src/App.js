import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import "./App.css";

function App() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <div className="App">
      {/* <p>{ data }</p> */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
