import type { Metadata } from "next";
import { absoluteUrl, allowIndexing, canonicalUrl } from "@/lib/site";

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const canonical = canonicalUrl(path);
  const image = absoluteUrl("/og.png");

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Engida Lishan",
      locale: "en",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Engida Lishan, full-stack engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@morganfreak32",
    },
    robots: allowIndexing()
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
