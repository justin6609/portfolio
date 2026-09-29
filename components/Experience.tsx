'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ACTIVITIES: Array<{ title: string; tags: string[] }> = [
  { title: 'Hardware maintenance', tags: ['Diagnostics', 'Cleaning', 'Upgrades'] },
  { title: 'PC troubleshooting', tags: ['Diagnostics', 'Repair', 'Testing'] },
  { title: 'OS installation', tags: ['Installation', 'Drivers', 'Configuration'] },
  { title: 'Thermal paste replacement', tags: ['Disassembly', 'Cooling', 'Reassembly'] },
  {
    title: 'Asset inventory and documentation',
    tags: ['Inventory', 'Documentation', 'Reporting'],
  },
  {
    title: 'Ticketing system support',
    tags: ['Ticket triage', 'User support', 'Follow-up'],
  },
  {
    title: 'Data scraping / mining',
    tags: ['Python', 'Data collection', 'Records'],
  },
  {
    title: 'Technical support',
    tags: ['Troubleshooting', 'Setup', 'User assistance'],
  },
];

export default function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl scroll-mt-20 px-4 py-16 sm:px-6">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
        <h3 className="mt-2 text-sm font-semibold tracking-wide text-sky-600 dark:text-sky-400">
          Technical Experience / OJT Activities
        </h3>

        <ol data-testid="experience-timeline" className="relative mt-6 space-y-3 border-l border-black/10 pl-6 dark:border-white/15">
          {ACTIVITIES.map(({ title, tags }, i) => (
            <motion.li
              key={title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
              className="relative rounded-xl border border-black/10 px-4 py-4 dark:border-white/10"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-5 h-3 w-3 rounded-full border-2 border-sky-600 bg-white dark:border-sky-400 dark:bg-slate-950"
              />
              <h4 className="text-base font-semibold tracking-tight">{title}</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-700 dark:border-white/15 dark:text-zinc-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
