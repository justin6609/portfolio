'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Mail,
  Terminal,
} from 'lucide-react';
import { EMAIL_HREF, GITHUB_URL, RESUME_MAILTO } from './site';

const pillBase =
  'inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium';
const pillPrimary = `${pillBase} bg-zinc-950 text-white dark:bg-white dark:text-zinc-950`;
const pillOutline = `${pillBase} border border-black/10 dark:border-white/15`;

const FLOATERS = [
  { Icon: Terminal, className: '-left-4 top-8', duration: 5 },
  { Icon: Code2, className: '-right-3 top-1/3', duration: 6 },
  { Icon: Database, className: '-left-3 bottom-10', duration: 5.5 },
  { Icon: Globe, className: 'right-8 -top-4', duration: 4.5 },
  { Icon: Cpu, className: 'right-1/4 -bottom-4', duration: 6.5 },
  { Icon: GitBranch, className: 'left-1/3 -top-3', duration: 5.2 },
];

function CodePreview() {
  return (
    <div
      role="img"
      aria-label="Code preview of a Next.js portfolio component"
      className="overflow-hidden rounded-xl border border-black/10 bg-zinc-950 shadow-2xl dark:border-white/15"
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-3 font-mono text-xs text-zinc-400">portfolio.tsx</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6">
          <code>
            <span className="text-purple-400">export default function</span>{' '}
            <span className="text-sky-300">Portfolio</span>
            <span className="text-zinc-300">() {'{'}</span>
            {'\n  '}
            <span className="text-purple-400">return</span>{' '}
            <span className="text-zinc-300">&lt;</span>
            <span className="text-sky-300">Hero</span>
            {'\n    '}
            <span className="text-zinc-400">name</span>
            <span className="text-zinc-300">=</span>
            <span className="text-green-300">&quot;Neil Justin&quot;</span>
            {'\n    '}
            <span className="text-zinc-400">stack</span>
            <span className="text-zinc-300">=</span>
            <span className="text-zinc-300">{'{['}</span>
            <span className="text-green-300">&quot;Next.js&quot;</span>
            <span className="text-zinc-300">, </span>
            <span className="text-green-300">&quot;Flask&quot;</span>
            <span className="text-zinc-300">{']}'}</span>
            {'\n  '}
            <span className="text-zinc-300">/&gt;;</span>
            {'\n'}
            <span className="text-zinc-300">{'}'}</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="mx-auto grid w-full max-w-5xl scroll-mt-20 items-center gap-10 px-4 pb-16 pt-20 sm:px-6 md:grid-cols-2"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
          Hi, I&apos;m Neil Justin Marcelo
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Building Modern Web Experiences
        </h1>
        <p className="mt-3 text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-300">
          Computer Science Student | Full-Stack Web Developer
        </p>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Computer Science student and aspiring Full-Stack Web Developer passionate about
          building practical, scalable, and user-focused applications.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#projects" className={pillPrimary}>
            View My Projects
          </a>
          <a
            href={RESUME_MAILTO}
            className={pillOutline}
            title="Resume available on request — email me"
          >
            Download Resume
          </a>
          <a href="#contact" className={pillOutline}>
            Contact Me
          </a>
        </div>
        <div className="mt-6 flex gap-4 text-sm">
          <a href={GITHUB_URL} aria-label="GitHub profile">
            GitHub
          </a>
          <a href={EMAIL_HREF} aria-label="Email Neil Justin" className="inline-flex items-center gap-1.5">
            <Mail size={16} aria-hidden="true" /> Email
          </a>
        </div>
      </motion.div>

      <div className="relative">
        <CodePreview />
        <div data-testid="floating-icons" aria-hidden="true" className="pointer-events-none absolute inset-0">
          {FLOATERS.map(({ Icon, className, duration }, i) => (
            <motion.span
              key={i}
              className={`absolute flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white text-sky-600 shadow-lg dark:border-white/15 dark:bg-slate-900 dark:text-sky-400 ${className}`}
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={18} aria-hidden="true" />
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
