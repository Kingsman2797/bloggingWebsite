import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="wordmark inline-flex items-center gap-2 text-[1.05rem] font-black text-[#2a2019]"
      aria-label="lowkeykaushikey home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-[0.3rem] border border-[#2a2019] bg-[#f4b183] text-sm shadow-[4px_4px_0_#2a2019]">
        LK
      </span>
      <span className="leading-none">
        lowkey<span className="text-[#b86f52]">kaushikey</span><span className="text-[#9a4f58]">_</span>
      </span>
    </Link>
  );
}
