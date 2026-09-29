import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mock-geist-sans' }),
  Geist_Mono: () => ({ variable: 'mock-geist-mono' }),
}));

import Home from '../app/page';
import { metadata } from '../app/layout';

const NAV_LINKS: Array<[string, string]> = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Education', '#education'],
  ['Contact', '#contact'],
];

describe('homepage route shell (ticket 01)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark', 'light');
  });

  it('renders a sticky navbar with all 7 anchors pointing at existing sections', () => {
    render(<Home />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toHaveClass('sticky');

    for (const [name, href] of NAV_LINKS) {
      const link = within(nav).getByRole('link', { name });
      expect(link).toHaveAttribute('href', href);
      expect(document.getElementById(href.slice(1))).not.toBeNull();
    }
  });

  it('provides a mobile menu button that toggles navigation', async () => {
    const user = userEvent.setup();
    render(<Home />);
    const button = screen.getByRole('button', { name: /menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('defaults to dark theme and persists the toggle', async () => {
    const user = userEvent.setup();
    render(<Home />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    const toggle = screen.getByRole('button', { name: /theme|dark|light/i });
    await user.click(toggle);
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');

    await user.click(toggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('exposes portfolio SEO metadata', () => {
    expect(String(metadata.title)).toMatch(/Neil Justin/i);
    expect(String(metadata.description)).toMatch(/Full-Stack|portfolio/i);
  });

  it('contains no LinkedIn links in V1', () => {
    render(<Home />);
    const links = screen.getAllByRole('link') as HTMLAnchorElement[];
    const hrefs = links.map((a) => a.href);
    expect(hrefs.some((h) => h.includes('linkedin.com'))).toBe(false);
  });

  it('has no critical accessibility violations on the shell', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results.violations.filter((v: { impact?: string }) => v.impact === 'critical')).toHaveLength(0);
  });
});
