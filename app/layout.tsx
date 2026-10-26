import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BackToTop } from "@/components/site/BackToTop";
import { absoluteUrl, allowIndexing, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Engida Lishan | Full-stack engineer",
    template: "%s | Engida Lishan",
  },
  description:
    "Full-stack engineer in Addis Ababa building AI, commerce, and fintech products with Next.js, Python, and pgvector.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "profile",
    url: absoluteUrl("/"),
    siteName: "Engida Lishan",
    locale: "en",
    title: "Engida Lishan | Full-stack engineer",
    description:
      "Full-stack engineer in Addis Ababa building AI, commerce, and fintech products with Next.js, Python, and pgvector.",
    images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: "Engida Lishan, full-stack engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@engida_lish",
    title: "Engida Lishan | Full-stack engineer",
    description:
      "Full-stack engineer in Addis Ababa building AI, commerce, and fintech products with Next.js, Python, and pgvector.",
    images: [absoluteUrl("/og.png")],
  },
  robots: allowIndexing() ? undefined : { index: false, follow: false },
  icons: {
    icon: [{ url: absoluteUrl("/favicon.png"), type: "image/png" }],
    shortcut: absoluteUrl("/favicon.png"),
    apple: absoluteUrl("/favicon.png"),
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-site-bg focus:p-3 focus:text-site-accent"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
