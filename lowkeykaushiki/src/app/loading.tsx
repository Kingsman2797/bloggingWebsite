import { LoadingPulse } from "@/components/LoadingPulse";

export default function Loading() {
  return (
    <main className="min-h-screen bg-transparent px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <LoadingPulse label="Loading page" />
      </div>
    </main>
  );
}
