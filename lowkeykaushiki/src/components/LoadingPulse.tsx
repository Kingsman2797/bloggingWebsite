export function LoadingPulse({ label = "Loading" }: { label?: string }) {
  return (
    <div className="modern-panel flex items-center gap-3 rounded-[0.45rem] border border-[#d8c8b9] bg-[#fffefa]/88 px-4 py-3 backdrop-blur">
      <span className="inline-flex h-3.5 w-3.5 animate-pulse rounded-full bg-[#b86f52]" />
      <span className="text-sm font-bold text-[#2a2019]">{label}</span>
    </div>
  );
}
