import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders hero section', () => {
  render(<App />);
  const heroElement = screen.getByText(/Transform Your Conversations/i);
  expect(heroElement).toBeInTheDocument();
});

test('toggles dark mode', () => {
  render(<App />);
  const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
  fireEvent.click(themeToggle);
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
});
