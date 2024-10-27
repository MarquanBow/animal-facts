// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import AnimalSearch from './components/AnimalSearch';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/search">Animal Search</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<AnimalSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
