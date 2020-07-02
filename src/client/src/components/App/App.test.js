import App from './App';

test('renders learn react link', () => {
  expect(true).toBeTruthy();
});

test('Add', () => {
  const app = new App();
  expect(app.add(1,3)).toBe(4);
});