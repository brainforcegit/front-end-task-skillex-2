import React from 'react';

const ResultsTable = ({ results }) => {
  return (
    <table className={'results-table'}>
      <thead>
      <tr>
        <th>Combination</th>
        <th>Odds</th>
        <th>Winnings</th>
      </tr>
      </thead>
      <tbody>
      {results.map((result, index) => (
        <tr key={index}>
          <td>{result.combination.join(', ')}</td>
          <td>{result.odds}</td>
          <td>{result.winnings.toFixed(2)}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
