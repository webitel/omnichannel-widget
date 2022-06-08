import bToMb from '../bToMb';

test('bToMb', () => {
  const input = 10023224;
  const output = 9;
  expect(bToMb(input)).toBe(output);
});
