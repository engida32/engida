import Link from "next/link";
import type { WorkItem } from "@/content/types";

export function WorkList({ items }: { items: WorkItem[] }) {
  return (
    <ul className="divide-y divide-site-border border-y border-site-border">
      {items.map((item) => {
        const caseHref = item.caseStudySlug ? `/work/${item.caseStudySlug}/` : undefined;
        return (
          <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-[56px_1fr] sm:gap-4">
            <span className="tabular text-sm text-site-muted">{item.year}</span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {caseHref ? (
                  <Link
                    href={caseHref}
                    className="font-semibold text-site-text underline-offset-4 hover:text-site-accent hover:underline"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="font-semibold">{item.title}</span>
                )}
                {item.liveUrl ? (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-site-accent underline-offset-4 hover:underline"
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
                    className="text-sm text-site-accent underline-offset-4 hover:underline"
                  >
                    <span aria-hidden="true">Source</span>
                    <span className="sr-only">
                      Source: {item.title} (opens in a new tab)
                    </span>
                  </a>
                ) : null}
              </div>
              <p className="mt-1 max-w-[62ch] text-sm">{item.description}</p>
              <p className="mt-1 text-xs text-site-muted">{item.stack.join(" / ")}</p>
              {item.note ? <p className="mt-1 text-xs text-site-warning">{item.note}</p> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
