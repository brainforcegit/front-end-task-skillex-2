import React, { useState, useEffect } from 'react';
import InputForm from './InputForm';
import ResultsTable from './ResultTable';
import { getCombinations, calculateWinnings } from '../utils/calculations';
import './BetCalculator.css';

function BetCalculator() {
  const [odds, setOdds] = useState(Array(16).fill(2));
  const [statuses, setStatuses] = useState(Array(16).fill('correct'));
  const [systemType, setSystemType] = useState('2 from 3');
  const [totalStake, setTotalStake] = useState(100);
  const [combinations, setCombinations] = useState([]);
  const [results, setResults] = useState([]);
console.log(statuses)
  useEffect(() => {
    const numSelections = getNumberOfSelections(systemType);
    setOdds((prevOdds) => {
      return prevOdds.slice(0, numSelections).concat(Array(16 - numSelections).fill(2));
    });
    setStatuses((prevStatuses) => {
      return prevStatuses.slice(0, numSelections).concat(Array(16 - numSelections).fill('correct'));
    });
  }, [systemType]);

  const availableSystems = [];
  for (let i = 2; i <= 16; i++) {
    for (let j = i; j <= 16; j++) {
      availableSystems.push(`${i} from ${j}`);
    }
  }

  const getNumberOfSelections = (systemType) => {
    const [num] = systemType.split(' ').map(Number);
    return num || 0;
  };

  const calculateCombinations = () => {
    const numSelections = getNumberOfSelections(systemType);
    if (odds.filter(Boolean).length < numSelections || totalStake <= 0 || !totalStake) {
      alert('Please enter enough valid odds and a positive stake');
      return;
    }

    const generatedCombinations = getCombinations(odds, systemType,statuses);
    setCombinations(generatedCombinations);
    const winnings = calculateWinnings(generatedCombinations, totalStake, statuses);
    setResults(winnings);
  };

  return (
    <div className="calculator-container">
      <h2>System Bets Calculator</h2>

      <div className={'system-wrapper'}>
        <div>
          <label className="label">System</label>
          <select className="select" value={systemType} onChange={(e) => setSystemType(e.target.value)}>
            {availableSystems.map((system) => (
              <option key={system} value={system}>{system}</option>
            ))}
          </select>
        </div>

        <div className={'total-wrapper'}>
          <InputForm
            odds={odds}
            setOdds={setOdds}
            systemType={systemType}
            totalStake={totalStake}
            setTotalStake={setTotalStake}
            statuses={statuses}
            setStatuses={setStatuses}
            combinations={combinations}
            setCombinations={setCombinations}
            setResults={setResults}
          />
          <button onClick={calculateCombinations} className="calculate-button">Compute</button>
        </div>
      </div>

      {!!results.length && (
        <div>
          <ResultsTable results={results} />
          <div className="summary">
            <p>Winnings: <span>{results.reduce((sum, r) => sum + r.winnings, 0).toFixed(2)}</span></p>
            <p>Stake: <span>{totalStake}</span></p>
            <p>Stake per combination: <span>{(totalStake / (results.length || 1)).toFixed(2)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BetCalculator;
