import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import VerifyIdentity from './components/IdentityVerification';
import RevokeID from './components/RevokeId';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Healthcare Identity Management</h1>
        <nav>
        <Link to="/register" className="nav-button">Register</Link>
        <Link to="/verify" className="nav-button">Verify Identity</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h2>Welcome! Please register or verify your identity.</h2>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/verify" element={<VerifyIdentity />} />
          <Route path="/revoke" element={<RevokeID />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
