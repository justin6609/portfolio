import { Mail } from 'lucide-react';
import { EMAIL_HREF, GITHUB_URL, LOCATION } from './site';

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-8 dark:border-white/10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:text-zinc-400">
        <span>Neil Justin Marcelo — {LOCATION}</span>
        <span className="flex gap-4">
          <a href={GITHUB_URL} aria-label="GitHub profile">
            GitHub
          </a>
          <a href={EMAIL_HREF} aria-label="Email Neil Justin" className="inline-flex items-center gap-1.5">
            <Mail size={16} aria-hidden="true" /> Email
          </a>
        </span>
      </div>
    </footer>
  );
}
