
import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import {Login}  from "./components/Sign-in/Login";
import {Register}  from "./components/Sign-in/Register";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
       <Router>
        <AuthProvider >
       <ProtectedRoute> <Navbar/></ProtectedRoute>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </Routes>
      </AuthProvider>
      </Router>
    </>
  );
}

export default App;