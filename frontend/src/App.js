import React from 'react';
// import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Feed from './components/Feed/Feed';
import "./App.css";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Feed />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;