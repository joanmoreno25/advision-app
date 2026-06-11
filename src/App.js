import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Landing from './pages/Landing'; // Importación actualizada

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública principal conectada a Landing */}
        <Route path="/" element={<Landing />} />
        
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;