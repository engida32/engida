import { basePath } from "@/lib/site";

export function assetPath(path: string): string {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return `${basePath()}${withLeadingSlash}`;
}
