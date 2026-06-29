import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/register";
import Chat from "./pages/Chat";
import './App.css'
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <>
    <Routes>
      <Route path = "/" element={<Navigate to ="/chat" replace={true} />}/>
      <Route path = "/login" element={<Login />}/>
      <Route path = "/register" element={<Register />} />
      <Route 
      path = "/chat"
      element ={
        <ProtectedRoute><Chat/></ProtectedRoute>
      } 
      />

    </Routes>
    
    </>
  );
}



export default App
