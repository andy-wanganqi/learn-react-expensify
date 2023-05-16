const add = (a, b) => a + b;

test('should add two numbers', () => {
  const result = add(10, 20);
  const exp = 30;
  expect(result).toBe(exp);

  // throw new Error(`message`);
});
