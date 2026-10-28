import { Fragment } from "react";
import type { ExperienceItem } from "@/content/types";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function Outcome({ text, metrics }: { text: string; metrics?: string[] }) {
  if (!metrics || metrics.length === 0) return <>{text}</>;

  const pattern = new RegExp(`(${metrics.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        metrics.includes(part) ? (
          <strong key={`${part}-${index}`} className="metric font-semibold text-site-text">
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ol data-stagger="experience" className="space-y-8">
      {items.map((item) => (
        <li
          key={`${item.company}-${item.start}`}
          data-stagger-item
          className="timeline-item grid grid-cols-1 gap-x-6 gap-y-1 pl-6 sm:grid-cols-[minmax(0,1fr)_minmax(120px,max-content)]"
        >
          <p className="col-start-1 font-mono text-[11px] uppercase tracking-[0.12em] text-site-accent">
            {item.companyUrl ? (
              <a
                href={item.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link tap-target"
              >
                {item.company}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              item.company
            )}
          </p>
          <div className="col-start-1 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.06em] text-site-muted tabular sm:col-start-2 sm:row-start-1 sm:text-right sm:text-[13px] sm:tracking-normal">
            <div>
              {item.start} to {item.end}
            </div>
            <div>{item.location}</div>
          </div>
          <h3 className="col-start-1 mt-1 font-mono text-lg font-semibold leading-snug">
            {item.role}
          </h3>
          <p className="col-start-1 mt-2 max-w-[62ch] text-[15px]">{item.scope}</p>
          <p className="col-start-1 mt-1 max-w-[62ch] text-[15px] text-site-muted">
            <Outcome text={item.outcome} metrics={item.metrics} />
          </p>
        </li>
      ))}
    </ol>
  );
}
