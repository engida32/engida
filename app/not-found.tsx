import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell section pt-16">
      <p className="text-sm text-site-muted">404</p>
      <h1 className="mt-3 text-[32px] font-semibold sm:text-[40px]">command not found</h1>
      <p className="mt-4 max-w-[62ch] text-site-muted">
        That page does not exist. The work index is a good place to restart.
      </p>
      <Link href="/#work" className="prose-link mt-8 inline-block">
        Back to selected work
      </Link>
    </div>
  );
}
