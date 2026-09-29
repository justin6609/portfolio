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

function resetTheme() {
  localStorage.clear();
  document.documentElement.classList.remove('dark', 'light');
}

describe('homepage route shell (ticket 01)', () => {
  beforeEach(resetTheme);
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

describe('hero + about + footer identity (ticket 02)', () => {
  beforeEach(resetTheme);
  it('shows role, headline, and supporting text in the hero', () => {
    render(<Home />);
    const hero = document.getElementById('home') as HTMLElement;
    expect(
      within(hero).getByText('Computer Science Student | Full-Stack Web Developer')
    ).toBeInTheDocument();
    expect(
      within(hero).getByRole('heading', { name: /Building Modern Web Experiences/i })
    ).toBeInTheDocument();
    expect(within(hero).getByText(/practical, scalable, and user-focused/i)).toBeInTheDocument();
  });

  it('wires hero CTAs to sections and resume to a mailto fallback', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /View My Projects/i })).toHaveAttribute(
      'href',
      '#projects'
    );
    expect(screen.getByRole('link', { name: /Contact Me/i })).toHaveAttribute(
      'href',
      '#contact'
    );
    const resume = screen.getByRole('link', { name: /Download Resume/i });
    expect(resume.getAttribute('href')).toMatch(
      /^mailto:neiljustinmarcelo@gmail\.com\?subject=Resume%20Request$/
    );
    expect(resume.getAttribute('title')).toMatch(/available on request/i);
  });

  it('renders a code preview visual with floating tech icons', () => {
    render(<Home />);
    expect(screen.getByRole('img', { name: /code preview/i })).toBeInTheDocument();
    expect(screen.getByTestId('floating-icons').querySelectorAll('svg')).not.toHaveLength(0);
  });

  it('lists all seven about highlights', () => {
    render(<Home />);
    const about = document.getElementById('about');
    expect(about).not.toBeNull();
    for (const item of [
      'Full-stack web development',
      'Frontend development',
      'Backend development',
      'Database development',
      'UI/UX',
      'Problem solving',
      'Continuous learning',
    ]) {
      expect(within(about as HTMLElement).getByText(item)).toBeInTheDocument();
    }
  });

  it('renders four stat cards', () => {
    render(<Home />);
    const stats = screen.getByTestId('about-stats');
    const items = within(stats).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    const texts = items.map((li) => (li.textContent ?? '').replace(/\s+/g, ' ').trim());
    for (const stat of [
      '3rd Year Computer Science Student',
      'Full-Stack Development',
      'Multiple Web Projects',
      'Always Learning',
    ]) {
      expect(texts.some((t) => t.includes(stat))).toBe(true);
    }
  });

  it('renders a footer with identity, location, and GitHub/Email links', () => {
    render(<Home />);
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText(/Neil Justin Marcelo/)).toBeInTheDocument();
    expect(within(footer).getByText(/Calbayog City, Samar, Philippines/)).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/neiljustinmarcelo-tech'
    );
    expect(within(footer).getByRole('link', { name: /Email/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:neiljustinmarcelo@gmail\.com/)
    );
  });
});

describe('skill groups + service offerings (ticket 03)', () => {
  beforeEach(resetTheme);
  it('renders all four skill groups with every listed skill', () => {
    render(<Home />);
    const skills = document.getElementById('skills') as HTMLElement;
    expect(skills).not.toBeNull();
    for (const group of ['Frontend', 'Backend', 'Database', 'Tools']) {
      expect(within(skills).getByRole('heading', { name: new RegExp(group, 'i') })).toBeInTheDocument();
    }
    for (const skill of [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Python',
      'Flask',
      'Node.js',
      'REST APIs',
      'Supabase',
      'PostgreSQL',
      'SQL',
      'Git',
      'GitHub',
      'VS Code',
      'Vercel',
      'Figma',
    ]) {
      expect(within(skills).getByText(skill)).toBeInTheDocument();
    }
  });

  it('renders all six service offerings with titles', () => {
    render(<Home />);
    const services = document.getElementById('services') as HTMLElement;
    expect(services).not.toBeNull();
    for (const title of [
      'Full-Stack Web Development',
      'Frontend Development',
      'Backend Development',
      'Database Integration',
      'Responsive UI Development',
      'API Development',
    ]) {
      expect(
        within(services).getByRole('heading', { name: new RegExp(title, 'i') })
      ).toBeInTheDocument();
    }
  });

  it('renders skill and service content with reduced motion respected', () => {
    window.matchMedia = ((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as typeof window.matchMedia;
    render(<Home />);
    expect(
      within(document.getElementById('skills') as HTMLElement).getByText('Tailwind CSS')
    ).toBeInTheDocument();
    expect(
      within(document.getElementById('services') as HTMLElement).getByRole('heading', {
        name: /API Development/i,
      })
    ).toBeInTheDocument();
  });
});
