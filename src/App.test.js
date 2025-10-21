import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sneaker store', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Bienvenido a Sneaker Store/i);
  expect(welcomeElement).toBeInTheDocument();
});
