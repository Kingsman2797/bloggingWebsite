import { Camera, Sparkles } from "lucide-react";
import Link from "next/link";

const instagramHref =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/lowkeykaushikey";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-[var(--rose)]">
            lowkeykaushikey
          </p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--muted)]">
            &quot;Write softly, live honestly, and keep a little light in the room.&quot;
          </p>
        </div>
        <Link
          href={instagramHref}
          target="_blank"
          rel="noreferrer"
          className="modern-panel inline-flex items-center gap-2 rounded-[0.35rem] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm font-bold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--clay)]/60"
        >
          <Camera className="h-4 w-4 text-[var(--rose)]" />
          <span>@lowkeykaushikey</span>
          <Sparkles className="h-3.5 w-3.5 text-[var(--clay)]" />
        </Link>
      </div>
    </footer>
  );
}
