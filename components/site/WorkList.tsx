"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { WorkItem } from "@/content/types";
import { assetPath } from "@/lib/asset-path";

function InternalBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-site-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-site-muted">
      <Lock aria-hidden="true" className="size-3" />
      Internal System
    </span>
  );
}

function ExternalAction({
  href,
  label,
  title,
  preview = false,
}: {
  href: string;
  label: "Live" | "Source";
  title: string;
  preview?: boolean;
}) {
  const accessible = `${label}: ${title} (opens in a new tab)`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessible}
      data-preview-live={preview && label === "Live" ? "true" : undefined}
      data-preview-source={preview && label === "Source" ? "true" : undefined}
      className="prose-link tap-target preview-action relative z-10 text-site-accent"
    >
      <span aria-hidden="true">{label}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function WorkRow({
  item,
  featured,
  onPreview,
}: {
  item: WorkItem;
  featured: boolean;
  onPreview: (slug: string, trigger: HTMLAnchorElement) => void;
}) {
  const caseSlug = item.caseStudySlug;
  const isCase = Boolean(caseSlug);
  const titleSize = featured ? "text-xl" : "text-base";

  return (
    <li
      data-stagger-item
      data-featured={featured ? "true" : "false"}
      data-case-study={isCase ? "true" : "false"}
      data-internal={item.visibility === "internal" ? "true" : undefined}
      className={[
        "group relative -mx-3 grid gap-2 px-3 py-5 sm:grid-cols-[80px_1fr] sm:gap-4",
        isCase
          ? "transition-[background-color,box-shadow] duration-150 hover:bg-site-surface-hover hover:shadow-[inset_2px_0_0_var(--site-accent)] focus-within:bg-site-surface-hover focus-within:shadow-[inset_2px_0_0_var(--site-accent)]"
          : "",
      ].join(" ")}
    >
      <span
        data-work-date
        className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-site-muted tabular sm:text-[13px] sm:tracking-normal"
      >
        {item.year}
      </span>
      <div className="min-w-0">
        {item.category ? (
          <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.08em] text-site-muted">
            {item.category}
          </p>
        ) : null}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h4 className="m-0">
            {caseSlug ? (
              <Link
                href={`/work/${caseSlug}/`}
                prefetch={false}
                data-work-title
                data-case-slug={caseSlug}
                aria-haspopup="dialog"
                onClick={(event) => {
                  if (
                    event.button !== 0 ||
                    event.metaKey ||
                    event.ctrlKey ||
                    event.shiftKey ||
                    event.altKey
                  ) {
                    return;
                  }
                  event.preventDefault();
                  onPreview(caseSlug, event.currentTarget);
                }}
                className={`work-title tap-target font-mono font-semibold ${titleSize} after:absolute after:inset-0 after:content-['']`}
              >
                {item.title}
              </Link>
            ) : (
              <span data-work-title className={`font-mono font-semibold ${titleSize}`}>
                {item.title}
              </span>
            )}
          </h4>
          {item.visibility === "internal" ? <InternalBadge /> : null}
          {item.liveUrl ? (
            <ExternalAction href={item.liveUrl} label="Live" title={item.title} />
          ) : null}
          {item.sourceUrl ? (
            <ExternalAction href={item.sourceUrl} label="Source" title={item.title} />
          ) : null}
          {caseSlug ? (
            <span
              aria-hidden="true"
              className="ml-auto inline-flex shrink-0 items-baseline gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-site-muted"
            >
              Preview
              <span className="work-cue-arrow inline-block transition-transform duration-150 group-hover:translate-x-0.5 group-focus-within:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none">
                -&gt;
              </span>
            </span>
          ) : null}
        </div>
        <p className="mt-1 line-clamp-2 max-w-[62ch] text-[15px]">{item.description}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className={[
                "rounded-full border border-site-border bg-site-surface font-mono text-xs text-site-muted",
                featured ? "px-2 py-1" : "px-1.5 py-0.5",
              ].join(" ")}
            >
              {tech}
            </li>
          ))}
        </ul>
        {item.note && !item.noteInPreviewOnly ? (
          <p data-work-note className="mt-2 text-xs text-site-warning">
            <span className="font-mono uppercase tracking-[0.08em]">Note: </span>
            {item.note}
          </p>
        ) : null}
      </div>
    </li>
  );
}

const previewListeners = new Set<() => void>();

function emitPreviewChange() {
  for (const listener of previewListeners) listener();
}

function subscribeToPreview(listener: () => void) {
  previewListeners.add(listener);
  window.addEventListener("popstate", listener);
  return () => {
    previewListeners.delete(listener);
    window.removeEventListener("popstate", listener);
  };
}

function getPreviewParam() {
  if (typeof window === "undefined") return null;
  return new URL(window.location.href).searchParams.get("preview");
}

function getServerPreviewParam() {
  return null;
}

export function WorkList({ items }: { items: WorkItem[] }) {
  const previewParam = useSyncExternalStore(
    subscribeToPreview,
    getPreviewParam,
    getServerPreviewParam,
  );
  const activeItem = previewParam
    ? (items.find((item) => item.caseStudySlug === previewParam) ?? null)
    : null;
  const activeSlug = activeItem?.caseStudySlug ?? null;

  const openerRef = useRef<HTMLAnchorElement | null>(null);
  const pushedRef = useRef(false);
  const closingRef = useRef(false);

  const findTitleLink = useCallback((slug: string) => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-work-title][data-case-slug]"),
    );
    return links.find((link) => link.dataset.caseSlug === slug) ?? null;
  }, []);

  const openPreview = useCallback(
    (slug: string, trigger: HTMLAnchorElement) => {
      const url = new URL(window.location.href);
      url.searchParams.set("preview", slug);
      const state = { ...(window.history.state ?? {}), preview: slug };

      if (activeItem !== null) {
        window.history.replaceState(state, "", url);
      } else {
        window.history.pushState(state, "", url);
        pushedRef.current = true;
      }

      closingRef.current = false;
      openerRef.current = trigger;
      emitPreviewChange();
    },
    [activeItem],
  );

  const closePreview = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back();
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("preview");
    const state = { ...(window.history.state ?? {}) } as Record<string, unknown>;
    delete state.preview;
    window.history.replaceState(state, "", url);
    emitPreviewChange();
  }, []);

  useEffect(() => {
    const resetClosing = () => {
      closingRef.current = false;
    };
    window.addEventListener("popstate", resetClosing);
    return () => window.removeEventListener("popstate", resetClosing);
  }, []);

  useEffect(() => {
    if (!activeSlug) return;
    const link = findTitleLink(activeSlug);
    if (link) openerRef.current = link;
  }, [activeSlug, findTitleLink]);

  const featured = items.filter((item) => item.featured);
  const more = items.filter((item) => !item.featured);

  return (
    <div className="space-y-8">
      <div data-work-group="featured">
        <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-site-muted">
          Featured case studies
        </h3>
        <ul data-stagger="work" className="divide-y divide-site-border border-t border-site-border">
          {featured.map((item) => (
            <WorkRow key={item.title} item={item} featured onPreview={openPreview} />
          ))}
        </ul>
      </div>

      <div data-work-group="more">
        <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-site-muted">
          More work
        </h3>
        <ul data-stagger="work" className="divide-y divide-site-border border-t border-site-border">
          {more.map((item) => (
            <WorkRow key={item.title} item={item} featured={false} onPreview={openPreview} />
          ))}
        </ul>
      </div>

      <Sheet
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) closePreview();
        }}
      >
        <SheetContent
          side="right"
          className="preview-sheet"
          data-preview-sheet
          onCloseAutoFocus={(event) => {
            const opener = openerRef.current;
            openerRef.current = null;
            if (opener && document.contains(opener)) {
              event.preventDefault();
              opener.focus();
            }
          }}
        >
          {activeItem && activeItem.caseStudySlug ? (
            <>
              {activeItem.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  data-preview-image
                  src={assetPath(activeItem.image.src)}
                  alt={activeItem.image.alt}
                  width={activeItem.image.width}
                  height={activeItem.image.height}
                  className="preview-image"
                />
              ) : null}
              <SheetHeader className="preview-header">
                <p className="preview-meta">
                  {[activeItem.year, activeItem.category].filter(Boolean).join(" / ")}
                </p>
                <SheetTitle className="preview-title">{activeItem.title}</SheetTitle>
                <SheetDescription className="preview-description">
                  {activeItem.description}
                </SheetDescription>
              </SheetHeader>
              <div className="preview-body">
                <ul className="preview-stack" aria-label="Stack">
                  {activeItem.stack.map((tech) => (
                    <li key={tech} className="case-badge">
                      {tech}
                    </li>
                  ))}
                </ul>
                {activeItem.note ? (
                  <p className="preview-note">
                    <span className="preview-note-label">Note: </span>
                    {activeItem.note}
                  </p>
                ) : null}
                <div className="preview-actions">
                  <Link
                    href={`/work/${activeItem.caseStudySlug}/`}
                    data-preview-full
                    className="preview-full preview-action"
                  >
                    Read full case study
                  </Link>
                  {activeItem.liveUrl ? (
                    <ExternalAction
                      href={activeItem.liveUrl}
                      label="Live"
                      title={activeItem.title}
                      preview
                    />
                  ) : null}
                  {activeItem.sourceUrl ? (
                    <ExternalAction
                      href={activeItem.sourceUrl}
                      label="Source"
                      title={activeItem.title}
                      preview
                    />
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
