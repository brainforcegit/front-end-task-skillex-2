import React from 'react';
import './BetCalculator.css';
import {calculateWinnings} from "../utils/calculations";

function InputForm({
                     odds,
                     setOdds,
                     systemType,
                     totalStake,
                     setTotalStake,
                     statuses,
                     setStatuses,
                     combinations,
                     setResults,
                   }) {
  const handleOddsChange = (index, value) => {

    const newOdds = [...odds];
    newOdds[index] = value ? parseFloat(value) : '';
    setOdds(newOdds);
  };

  const handleStatusChange = (index, status) => {
    const newStatuses = [...statuses];
    newStatuses[index] = status;
    setStatuses(newStatuses);

    // Пересчет выигрышей при изменении статуса
    const winnings = calculateWinnings(combinations, totalStake, newStatuses);
    setResults(winnings); // Обновление состояния с выигрышами
  };

  const getMaxOddsCount = () => {
    return parseInt(systemType.split(" from ")[1]) || 3;
  };
  return (
    <div className="input-form">
      <label className="label">Total Stake</label>
      <input
        type="number"
        className="input"
        value={totalStake}
        onChange={(e) => setTotalStake(parseFloat(e.target.value))}
      />

      {odds.slice(0, getMaxOddsCount()).map((odd, i) => (
        <div key={i} className="odds-section">
          <div className={"odds-wrapper"}>

          <label className="label">Odds{i + 1}</label>
          <input
            type="number"
            className="input"
            value={odd || ''}
            onChange={(e) => handleOddsChange(i, e.target.value)}
          />
          </div>
          <div className="status-options">
            <span>
            {i===0 ? <label>correct</label>:<></>}
              <input
                type="radio"
                name={`status-${i}`}
                value="correct"
                checked={statuses[i] === 'correct'}
                onChange={() => handleStatusChange(i, 'correct')}
                className="status-radio correct"
              />
            </span>
              <span>
            {i===0 ? <label>incorrect</label>:<></>}
            <input
                type="radio"
                name={`status-${i}`}
                value="incorrect"
                checked={statuses[i] === 'incorrect'}
                onChange={() => handleStatusChange(i, 'incorrect')}
                className="status-radio incorrect"
              />
              </span>
              <span>
               {i===0 ? <label>void</label>:<></>}
              <input
                type="radio"
                name={`status-${i}`}
                value="void"
                checked={statuses[i] === 'void'}
                onChange={() => handleStatusChange(i, 'void')}
                className="status-radio void"
              />
                </span>

          </div>
        </div>
      ))}
    </div>
  );
}

export default InputForm;
