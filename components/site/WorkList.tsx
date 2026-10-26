import Link from "next/link";
import type { WorkItem } from "@/content/types";

export function WorkList({ items }: { items: WorkItem[] }) {
  return (
    <ul data-stagger="work" className="divide-y divide-site-border border-y border-site-border">
      {items.map((item) => {
        const caseHref = item.caseStudySlug ? `/work/${item.caseStudySlug}/` : undefined;
        return (
          <li
            key={item.title}
            data-stagger-item
            className="relative -mx-3 grid gap-2 px-3 py-5 transition-[background-color] duration-150 hover:bg-site-surface focus-within:bg-site-surface sm:grid-cols-[80px_1fr] sm:gap-4"
          >
            <span data-work-date className="whitespace-nowrap tabular text-sm text-site-muted">
              {item.year}
            </span>
            <div className="min-w-0">
              {item.category ? (
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-site-muted">
                  {item.category}
                </p>
              ) : null}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {caseHref ? (
                  <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <Link href={caseHref} className="work-title font-semibold">
                      {item.title}
                    </Link>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-site-muted"
                    >
                      Case study <span className="text-site-accent">-&gt;</span>
                    </span>
                  </span>
                ) : (
                  <span className="font-semibold">{item.title}</span>
                )}
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link text-sm text-site-accent"
                  >
                    <span aria-hidden="true">Live</span>
                    <span className="sr-only">
                      Live: {item.title} (opens in a new tab)
                    </span>
                  </a>
                ) : null}
                {item.sourceUrl ? (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link text-sm text-site-accent"
                  >
                    <span aria-hidden="true">Source</span>
                    <span className="sr-only">
                      Source: {item.title} (opens in a new tab)
                    </span>
                  </a>
                ) : null}
              </div>
              <p className="mt-1 max-w-[62ch] text-sm">{item.description}</p>
              <p className="mt-1 font-mono text-[11px] text-site-muted">{item.stack.join(" / ")}</p>
              {item.note ? (
                <p className="mt-1 text-xs text-site-warning">
                  <span className="font-mono uppercase tracking-[0.08em]">Note: </span>
                  {item.note}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
