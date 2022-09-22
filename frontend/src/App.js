
import React from "react";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import {Login}  from "./components/Sign-in/Login";
import {Register}  from "./components/Sign-in/Register";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar/Navbar.js"
function App() {
  return (
    <>
       <Router>
        <AuthProvider >
       <Routes>
       <Route  path="/"
            element={
              <ProtectedRoute>
                <Navbar />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </Routes>
      </AuthProvider>
      </Router>
    </>
  );
}

export default App;