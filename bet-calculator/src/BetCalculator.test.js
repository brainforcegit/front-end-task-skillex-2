import { render, screen, fireEvent } from '@testing-library/react';
import BetCalculator from './components/BetCalculator';

test('проверка расчета выигрыша', () => {
  render(<BetCalculator />);

  fireEvent.change(screen.getByLabelText(/Коэффициент 1/i), { target: { value: '2.0' } });
  fireEvent.change(screen.getByLabelText(/Коэффициент 2/i), { target: { value: '2.0' } });
  fireEvent.change(screen.getByLabelText(/Коэффициент 3/i), { target: { value: '2.0' } });
  fireEvent.change(screen.getByLabelText(/Общая ставка/i), { target: { value: '100' } });

  fireEvent.click(screen.getByText(/Рассчитать/i));

  expect(screen.getByText(/Выигрыш/)).toBeInTheDocument();
});

import { getCombinations } from './utils/calculations';

test('getCombinations correctly calculates combinations for 2 from 3', () => {
  const odds = [2, 3, 4];
  const systemType = '2 from 3';
  const expected = [
    [2, 3],
    [2, 4],
    [3, 4],
  ];

  const result = getCombinations(odds, systemType);
  expect(result).toEqual(expected);
});

test('getCombinations handles invalid system type', () => {
  const odds = [2, 3, 4];
  const systemType = '5 from 10'; // Invalid as only 3 odds are available

  const result = getCombinations(odds, systemType);
  expect(result).toEqual([]); // Should return empty array
});

