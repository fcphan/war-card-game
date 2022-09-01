import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import GameScreen from './pages/GameScreen';
import HomePage from './pages/HomePage';
import ScoresPage from './pages/ScoresPage';

function App() {
  return (
    <Router>
      <nav className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/play'>Play</Link>
        <Link to='/scores'>Scores</Link>
      </nav>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/scores' element={<ScoresPage />} />
        <Route path='/play' element={<GameScreen />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
