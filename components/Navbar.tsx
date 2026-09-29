'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

type NavLink = { name: string; href: string };

const LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

function activeTone(isActive: boolean) {
  return isActive
    ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white'
    : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white';
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const sectionId = (href: string) => href.slice(1);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = LINKS.find((link) => sectionId(link.href) === entry.target.id);
            if (match) setActiveLink(match.name);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    LINKS.forEach((link) => {
      const el = document.getElementById(sectionId(link.href));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled
          ? 'border-black/10 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="text-base font-semibold tracking-tight">
          NJM
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                aria-current={activeLink === link.name ? 'true' : undefined}
                className={`rounded-full px-3 py-2 text-sm transition-colors ${activeTone(activeLink === link.name)}`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 md:hidden dark:border-white/15"
          >
            {menuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="border-t border-black/10 px-4 py-2 md:hidden dark:border-white/10"
          >
            {LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeLink === link.name ? 'true' : undefined}
                  className={`block rounded-lg px-3 py-2.5 text-base ${activeTone(activeLink === link.name)}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
