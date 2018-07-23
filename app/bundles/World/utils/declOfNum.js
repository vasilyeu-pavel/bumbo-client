export default function declOfNumber(number, titles) {
  const num = Math.abs(number);
  const cases = [2, 0, 1, 1, 1, 2];

  return titles[(num % 100 > 4 && num % 100 < 20) ? 2 : cases[(num % 10 < 5) ? num % 10 : 5]];
}
