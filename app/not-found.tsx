import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404: command not found",
  robots: { index: false, follow: false },
  alternates: { canonical: "/404/" },
};

export default function NotFound() {
  return (
    <div className="shell section pt-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-site-muted">404</p>
      <h1 className="mt-3">command not found</h1>
      <p className="mt-4 max-w-[62ch] text-[15px] text-site-muted">
        That page does not exist. Go home or jump back to selected work.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Link href="/" className="prose-link tap-target">
          Home
        </Link>
        <Link href="/#work" className="prose-link tap-target">
          Back to selected work
        </Link>
      </div>
    </div>
  );
}
