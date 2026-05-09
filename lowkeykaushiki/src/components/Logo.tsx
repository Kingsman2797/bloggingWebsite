import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="wordmark inline-flex items-center gap-2 text-[1.05rem] font-black text-[var(--foreground)]"
      aria-label="lowkeykaushikey home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-[0.3rem] border border-[var(--foreground)] bg-[var(--clay)] text-sm shadow-[4px_4px_0_var(--foreground)]">
        LK
      </span>
      <span className="leading-none">
        lowkey<span className="text-[var(--clay)]">kaushikey</span>
        <span className="text-[var(--rose)]">_</span>
      </span>
    </Link>
  );
}
