import {STATUSES_ENUM} from "../constants/enums";

export function getCombinations(odds, systemType,statuses) {
  const [select, from] = systemType.split(' from ').map(Number);
  console.log(statuses,'statuses',systemType,odds)

  if (isNaN(select) || isNaN(from) || select < 0 || from < 0) {
    console.error('Invalid input: select and from must be non-negative numbers.');
    return [];
  }

  if (from > odds.length) {
    console.error('Not enough odds available.');
    return [];
  }

  // Ensure all odds are numbers
  const selectedOdds = odds.slice(0, from).map(Number);
  console.log('Selected Odds:', selectedOdds);  // Add this log
  if (!Array.isArray(selectedOdds) || selectedOdds.length === 0 || selectedOdds.some(isNaN)) {
    console.error('Selected odds must be a non-empty array of numbers.');
    return [];
  }

  if (selectedOdds.length < select) {
    console.error('Not enough selected odds to generate combinations.');
    return [];
  }

  const result = [];

  const generateCombination = (start, combo) => {
    if (combo.length === select) {
      result.push(combo.slice());
      return;
    }
    for (let i = start; i < selectedOdds.length; i++) {
      combo.push(selectedOdds[i]);
      generateCombination(i + 1, combo);
      combo.pop();
    }
  };

  generateCombination(0, []);
  console.log('Generated combinations:', result); // Log combinations
  return result; // Return the result for further use
}

export function calculateWinnings(combinations, stake, statuses) {
  return combinations.map((combination,index) => {
    console.log(combination,'combination')
    const adjustedOdds = combination.map((odd) => {
      const statusMultiplier = STATUSES_ENUM[statuses[index]] || 1;
      return odd * statusMultiplier;
    });

    const odds = adjustedOdds.reduce((acc, odd) => acc * odd, 1);

    const winnings = odds * (stake / combinations.length);
    return { combination, odds, winnings };
  });
}
