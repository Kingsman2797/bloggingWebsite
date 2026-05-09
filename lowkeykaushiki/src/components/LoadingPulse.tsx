export function LoadingPulse({ label = "Loading" }: { label?: string }) {
  return (
    <div className="modern-panel flex items-center gap-3 rounded-[0.45rem] border border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] px-4 py-3 backdrop-blur">
      <span className="inline-flex h-3.5 w-3.5 animate-pulse rounded-full bg-[var(--clay)]" />
      <span className="text-sm font-bold text-[var(--foreground)]">{label}</span>
    </div>
  );
}
