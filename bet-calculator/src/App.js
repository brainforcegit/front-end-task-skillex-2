import React from 'react';
import BetCalculator from './components/BetCalculator';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>System Bets Calculator</h1>
      </header>
      <main className="app-content">
        <BetCalculator />
      </main>
    </div>
  );
}

export default App;
