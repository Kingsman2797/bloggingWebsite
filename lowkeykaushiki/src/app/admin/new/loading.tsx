import { LoadingPulse } from "@/components/LoadingPulse";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <LoadingPulse label="Opening editor" />
      </div>
    </main>
  );
}
