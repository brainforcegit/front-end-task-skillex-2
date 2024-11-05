import {STATUSES_ENUM} from "../constants/enums";

export function getCombinations(odds, systemType) {
  const [select, from] = systemType.split(' from ').map(Number);

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
  return combinations.map((combination, comboIndex) => {
    // Рассчитываем итоговый коэффициент для комбинации с учетом статусов
    const adjustedOdds = combination.map((odd, oddIndex) => odd * STATUSES_ENUM[statuses[comboIndex][oddIndex]]);
    const odds = adjustedOdds.reduce((acc, odd) => acc * odd, 1);

    // Вычисляем выигрыш для комбинации
    const winnings = odds * (stake / combinations.length);
    return { combination, odds, winnings };
  });
}



// im grace
// export function calculateWinnings(combinations, stake, statuses) {
//   console.log(statuses,'statuses')
//   const validCombinations = combinations.map((combo,index) => {
//     console.log(combo,index,'com')
//     return combo
//   });
//   console.log(validCombinations,'validCombinations')
//
//   return validCombinations.map((combination,index) => {
//     console.log(statuses[index],'statuses[index]',index)
//     const odds = combination.reduce((acc, odd) => acc * Number(odd), 1) * STATUSES_ENUM[statuses[index]];
//     const winnings = odds * (stake / validCombinations.length)  ;
//     return { combination, odds, winnings };
//   });
// }
