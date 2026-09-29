'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { EMAIL_ADDRESS, EMAIL_HREF, GITHUB_URL, LOCATION } from './site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

type Fields = { name: string; email: string; subject: string; message: string };

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' };

function validate(values: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Subject is required.';
  if (!values.message.trim()) errors.message = 'Message is required.';
  else if (values.message.trim().length < MIN_MESSAGE_LENGTH)
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  return errors;
}

function buildMailto(values: Fields): string {
  const subject = encodeURIComponent(values.subject.trim());
  const body = encodeURIComponent(
    `Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.message.trim()}`
  );
  return `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}

const inputClass =
  'w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-sky-500 focus:outline-none dark:border-white/15 dark:bg-slate-900 dark:text-zinc-50';

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  function setField<K extends keyof Fields>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    window.location.href = buildMailto(values);
  }

  const field = (
    key: keyof Fields,
    label: string,
    control: React.ReactNode
  ) => (
    <div>
      <label htmlFor={`inquiry-${key}`} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {control}
      {errors[key] && (
        <p role="alert" id={`inquiry-${key}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {errors[key]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="relative mx-auto w-full max-w-5xl scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-gradient-to-br from-sky-500/10 to-purple-500/10 blur-3xl"
          animate={reduceMotion ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h2 className="text-2xl font-semibold tracking-tight">Let&apos;s Build Something Together</h2>
        <p className="mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
          I&apos;m currently open to internship, OJT, freelance, and entry-level
          opportunities.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <form noValidate onSubmit={onSubmit} className="space-y-4">
            {field(
              'name',
              'Name',
              <input
                id="inquiry-name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                className={inputClass}
              />
            )}
            {field(
              'email',
              'Email',
              <input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                className={inputClass}
              />
            )}
            {field(
              'subject',
              'Subject',
              <input
                id="inquiry-subject"
                type="text"
                placeholder="Internship, freelance, or hello"
                value={values.subject}
                onChange={(e) => setField('subject', e.target.value)}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'inquiry-subject-error' : undefined}
                className={inputClass}
              />
            )}
            {field(
              'message',
              'Message',
              <textarea
                id="inquiry-message"
                rows={5}
                placeholder="Tell me about the role or project"
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'inquiry-message-error' : undefined}
                className={inputClass}
              />
            )}
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
            >
              Send Message
            </button>
          </form>

          <div className="flex flex-col gap-3 text-sm">
            <a href={EMAIL_HREF} aria-label="Email Neil Justin" className="inline-flex items-center gap-2">
              <Mail size={16} aria-hidden="true" className="shrink-0 text-sky-600 dark:text-sky-400" />
              {EMAIL_ADDRESS}
            </a>
            <a href={GITHUB_URL} aria-label="GitHub profile">
              GitHub
            </a>
            <span className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <MapPin size={16} aria-hidden="true" className="shrink-0 text-sky-600 dark:text-sky-400" />
              {LOCATION}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
