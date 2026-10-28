const FALLBACK_SITE_URL = "http://localhost:4173";

export function siteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL;
  return value.replace(/\/+$/, "");
}

export function basePath(): string {
  const value = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!value || value === "/") return "";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function stripBasePath(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  const prefix = basePath();
  if (!prefix) return normalized;
  if (normalized === prefix) return "/";
  if (normalized.startsWith(`${prefix}/`)) return normalized.slice(prefix.length) || "/";
  return normalized;
}

export function allowIndexing(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export function canonicalUrl(path = "/"): string {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const withTrailingSlash = withLeadingSlash.endsWith("/")
    ? withLeadingSlash
    : `${withLeadingSlash}/`;
  return `${siteUrl()}${withTrailingSlash}`;
}

export function absoluteUrl(path: string): string {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl()}${withLeadingSlash}`;
}
