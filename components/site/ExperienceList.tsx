import type { ExperienceItem } from "@/content/types";

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ol data-stagger="experience" className="space-y-8">
      {items.map((item) => (
        <li
          key={`${item.company}-${item.start}`}
          data-stagger-item
          className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6"
        >
          <div className="min-w-0">
            <h3 className="font-semibold">
              {item.role},{" "}
              {item.companyUrl ? (
                <a
                  href={item.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prose-link"
                >
                  <span>{item.company}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <span>{item.company}</span>
              )}
            </h3>
            <p className="mt-1 max-w-[62ch] text-sm">{item.scope}</p>
            <p className="mt-1 max-w-[62ch] text-sm text-site-muted">{item.outcome}</p>
          </div>
          <div className="whitespace-nowrap tabular text-sm text-site-muted sm:text-right">
            <div>{item.start} to {item.end}</div>
            <div>{item.location}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
