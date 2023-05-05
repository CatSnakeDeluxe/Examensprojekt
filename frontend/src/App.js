import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Feed from './components/Feed/Feed';
import Search from './components/Search/Search';
import PostForm from './components/PostForm/PostForm';
import UserPage from './components/UserPage/UserPage';
import Notification from './components/Notification/Notification';
import Chat from './components/Chat/Chat';
import "./App.css";

function App() {
  const { user } = useAuthContext();
  // console.log(user);
  // const user = localStorage.getItem('user');
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/search" element={user ? <Search /> : <Navigate to="/login" />}/>
        <Route path="/createPost" element={user ? <PostForm /> : <Navigate to="/login" />}/>
        <Route path="/userPage" element={user ? <UserPage /> : <Navigate to="/login" />}/>
        <Route path="/notification" element={user ? <Notification /> : <Navigate to="/login" />}/>
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />}/>
      </Routes>
    </div>
  );
}

export default App;