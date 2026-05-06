import { Camera, Sparkles } from "lucide-react";
import Link from "next/link";

const instagramHref =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/lowkeykaushikey";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#d8c8b9] bg-[#fffefa]/82 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-[#9a4f58]">
            lowkeykaushikey
          </p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[#51443a]">
            &quot;Write softly, live honestly, and keep a little light in the room.&quot;
          </p>
        </div>
        <Link
          href={instagramHref}
          target="_blank"
          rel="noreferrer"
          className="modern-panel inline-flex items-center gap-2 rounded-[0.35rem] border border-[#d8c8b9] bg-[#fffefa] px-4 py-3 text-sm font-bold text-[#2a2019] transition hover:-translate-y-0.5 hover:border-[#b86f52]/60"
        >
          <Camera className="h-4 w-4 text-[#9a4f58]" />
          <span>@lowkeykaushikey</span>
          <Sparkles className="h-3.5 w-3.5 text-[#b86f52]" />
        </Link>
      </div>
    </footer>
  );
}
