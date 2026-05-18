import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hangszerek menu', () => {
  render(<App />);
  const linkElement = screen.getByText(/hangszerek/i);
  expect(linkElement).toBeInTheDocument();
});
