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

describe('projects showcase (ticket 04)', () => {
  beforeEach(resetTheme);
  it('renders all three projects with names, descriptions, and tech badges', () => {
    render(<Home />);
    const projects = document.getElementById('projects') as HTMLElement;
    expect(projects).not.toBeNull();
    for (const name of ['MoneyTrack', 'Nevex E-Commerce', 'Personal Portfolio']) {
      expect(
        within(projects).getByRole('heading', { name: new RegExp(name, 'i') })
      ).toBeInTheDocument();
    }
    expect(within(projects).getByText(/balances, income, expenses, savings/i)).toBeInTheDocument();
    expect(within(projects).getByText(/product management, user accounts, admin dashboard/i)).toBeInTheDocument();
    for (const badge of [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Recharts',
      'Flask',
      'Jinja2',
      'Supabase',
      'Framer Motion',
      'Vercel Analytics',
    ]) {
      expect(within(projects).getAllByText(badge).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('shows no Repository, Live Demo, or View Details actions in V1', () => {
    render(<Home />);
    const projects = document.getElementById('projects') as HTMLElement;
    expect(within(projects).queryByRole('link', { name: /repository/i })).toBeNull();
    expect(within(projects).queryByRole('link', { name: /live demo/i })).toBeNull();
    expect(within(projects).queryByRole('link', { name: /view details/i })).toBeNull();
    expect(within(projects).queryByRole('button', { name: /view details/i })).toBeNull();
  });

  it('links View All Projects to the GitHub repositories tab', () => {
    render(<Home />);
    const projects = document.getElementById('projects') as HTMLElement;
    expect(within(projects).getByRole('link', { name: /view all projects/i })).toHaveAttribute(
      'href',
      'https://github.com/neiljustinmarcelo-tech?tab=repositories'
    );
  });
});

describe('experience + education (ticket 05)', () => {
  beforeEach(resetTheme);
  it('renders all eight experience activities with no employer or date fields', () => {
    render(<Home />);
    const experience = document.getElementById('experience') as HTMLElement;
    expect(experience).not.toBeNull();
    for (const activity of [
      'Hardware maintenance',
      'PC troubleshooting',
      'OS installation',
      'Thermal paste replacement',
      'Asset inventory and documentation',
      'Ticketing system support',
      'Data scraping / mining',
      'Technical support',
    ]) {
      expect(
        within(experience).getByRole('heading', { name: new RegExp(activity, 'i') })
      ).toBeInTheDocument();
    }
    expect(within(experience).queryByText(/20\d{2}/)).toBeNull();
    expect(experience.querySelector('time')).toBeNull();
  });

  it('renders the education card with school, degree, year, skills, and academic projects', () => {
    render(<Home />);
    const education = document.getElementById('education') as HTMLElement;
    expect(education).not.toBeNull();
    expect(
      within(education).getByText(/Christ the King College of Calbayog Inc\./i)
    ).toBeInTheDocument();
    expect(within(education).getByText(/Bachelor of Science/i)).toBeInTheDocument();
    expect(within(education).getByText(/Computer Science/i)).toBeInTheDocument();
    expect(within(education).getByText(/3rd Year/i)).toBeInTheDocument();
    for (const skill of ['HTML', 'JavaScript', 'Python', 'Supabase', 'Git']) {
      expect(within(education).getByText(skill)).toBeInTheDocument();
    }
    for (const project of ['MoneyTrack', 'Nevex E-Commerce', 'Personal Portfolio']) {
      expect(
        within(education).getByText(new RegExp(project, 'i'))
      ).toBeInTheDocument();
    }
  });

  it('contains no fabricated employers, testimonials, or statistics in these sections', () => {
    render(<Home />);
    for (const id of ['experience', 'education']) {
      const section = document.getElementById(id) as HTMLElement;
      expect(within(section).queryByText(/testimonial/i)).toBeNull();
      expect(within(section).queryByText(/\d+%|\d+x\b/i)).toBeNull();
    }
  });
});

function stubLocation() {
  const original = window.location;
  const stub = { href: 'http://localhost/' };
  Object.defineProperty(window, 'location', {
    value: stub,
    writable: true,
    configurable: true,
  });
  return {
    stub,
    restore() {
      Object.defineProperty(window, 'location', {
        value: original,
        writable: true,
        configurable: true,
      });
    },
  };
}

describe('inquiry form + final gate (ticket 06)', () => {
  beforeEach(resetTheme);
  it('blocks empty submit with inline errors and no navigation', async () => {
    const { restore, stub } = stubLocation();
    try {
      const user = userEvent.setup();
      render(<Home />);
      const contact = document.getElementById('contact') as HTMLElement;
      await user.click(within(contact).getByRole('button', { name: /send message/i }));
      expect(within(contact).getAllByRole('alert')).toHaveLength(4);
      expect(stub.href).toBe('http://localhost/');
    } finally {
      restore();
    }
  });

  it('blocks invalid email and short messages', async () => {
    const { restore, stub } = stubLocation();
    try {
      const user = userEvent.setup();
      render(<Home />);
      const contact = document.getElementById('contact') as HTMLElement;
      const form = contact.querySelector('form') as HTMLElement;
      await user.type(within(form).getByLabelText(/^name/i), 'Recruiter');
      await user.type(within(form).getByLabelText(/^email/i), 'not-an-email');
      await user.type(within(form).getByLabelText(/^subject/i), 'Internship');
      await user.type(within(form).getByLabelText(/^message/i), 'Hi');
      await user.click(within(contact).getByRole('button', { name: /send message/i }));
      const alerts = within(contact).getAllByRole('alert');
      expect(alerts.length).toBeGreaterThanOrEqual(2);
      expect(stub.href).toBe('http://localhost/');
    } finally {
      restore();
    }
  });

  it('builds a correctly encoded mailto on valid submit', async () => {
    const { restore, stub } = stubLocation();
    try {
      const user = userEvent.setup();
      render(<Home />);
      const contact = document.getElementById('contact') as HTMLElement;
      const form = contact.querySelector('form') as HTMLElement;
      await user.type(within(form).getByLabelText(/^name/i), 'Jane Recruiter');
      await user.type(within(form).getByLabelText(/^email/i), 'jane@company.com');
      await user.type(within(form).getByLabelText(/^subject/i), 'Freelance project');
      await user.type(
        within(form).getByLabelText(/^message/i),
        'Hello Neil, I would like to discuss a project with you.'
      );
      await user.click(within(contact).getByRole('button', { name: /send message/i }));
      expect(within(contact).queryByRole('alert')).toBeNull();
      expect(stub.href).toMatch(/^mailto:neiljustinmarcelo@gmail\.com\?subject=Freelance%20project&body=/);
      const body = decodeURIComponent(stub.href.split('&body=')[1]);
      expect(body).toMatch(/Jane Recruiter/);
      expect(body).toMatch(/jane@company\.com/);
      expect(body).toMatch(/discuss a project/);
    } finally {
      restore();
    }
  });

  it('shows Email, GitHub, and Location rows with working links and no LinkedIn', () => {
    render(<Home />);
    const contact = document.getElementById('contact') as HTMLElement;
    expect(within(contact).getByText(/Calbayog City, Samar, Philippines/)).toBeInTheDocument();
    expect(within(contact).getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:neiljustinmarcelo@gmail\.com/)
    );
    expect(within(contact).getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/neiljustinmarcelo-tech'
    );
    const hrefs = within(contact)
      .getAllByRole('link')
      .map((a) => (a as HTMLAnchorElement).href);
    expect(hrefs.some((h) => h.includes('linkedin.com'))).toBe(false);
  });

  it('wires every Resume button to the mailto fallback with no 404', () => {
    render(<Home />);
    const resumeLinks = screen.getAllByRole('link', { name: /resume/i });
    expect(resumeLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of resumeLinks) {
      expect(link.getAttribute('href')).toMatch(
        /^mailto:neiljustinmarcelo@gmail\.com\?subject=Resume%20Request$/
      );
    }
  });
});
