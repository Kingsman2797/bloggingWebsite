import { LoadingPulse } from "@/components/LoadingPulse";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <LoadingPulse label="Opening post" />
      </div>
    </main>
  );
}
