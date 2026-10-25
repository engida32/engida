import { profile } from "@/content/profile";

export default function HomePage() {
  return (
    <div className="shell">
      <section className="section pt-10">
        <h1 className="text-balance">
          <span className="block text-[32px] font-semibold leading-[1.15] sm:text-[40px]">
            {profile.name}
          </span>
          <span className="mt-3 block max-w-[62ch] text-lg font-normal text-site-muted">
            {profile.headline}
          </span>
        </h1>
        <p className="mt-6 max-w-[62ch]">{profile.availability}</p>
        <p className="mt-2 max-w-[62ch] text-site-muted">{profile.supporting}</p>
      </section>
    </div>
  );
}
