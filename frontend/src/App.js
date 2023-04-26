import React from 'react';
// import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Feed from './components/Feed/Feed';
import Search from './components/Search/Search';
import PostForm from './components/PostForm/PostForm';
import UserPage from './components/UserPage/UserPage';
import Notification from './components/Notification/Notification';
import Chat from './components/Chat/Chat';
import "./App.css";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Feed />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/search" element={<Search />}/>
        <Route path="/createPost" element={<PostForm />}/>
        <Route path="/userPage" element={<UserPage />}/>
        <Route path="/notification" element={<Notification />}/>
        <Route path="/chat" element={<Chat />}/>
      </Routes>
    </div>
  );
}

export default App;