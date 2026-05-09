import { LockKeyhole } from "lucide-react";
import { Logo } from "@/components/Logo";
import { loginAction } from "../actions";
import { SubmitButton } from "@/components/SubmitButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--background)] px-5">
      <div className="w-full max-w-md rounded-[0.35rem] border border-[var(--line)] bg-[var(--paper)] p-7 shadow-[10px_10px_0_var(--line)]">
        <Logo />
        <div className="mt-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-[0.35rem] bg-[var(--foreground)] text-[var(--background)]">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[var(--foreground)]">
              Admin login
            </h1>
            <p className="text-sm text-[var(--muted)]">For writing and editing posts.</p>
          </div>
        </div>
        {error ? (
          <p className="mt-5 rounded-[0.5rem] border border-[color-mix(in_srgb,var(--rose)_25%,var(--line))] bg-[color-mix(in_srgb,var(--rose)_12%,var(--paper))] p-3 text-sm font-semibold text-[var(--rose)]">
            The username or password was not right.
          </p>
        ) : null}
        <form action={loginAction} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              className="rounded-[0.5rem] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-[var(--foreground)] outline-none ring-[var(--clay)]/20 focus:ring-4"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-[0.5rem] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-[var(--foreground)] outline-none ring-[var(--clay)]/20 focus:ring-4"
            />
          </div>
          <SubmitButton idleLabel="Sign in" pendingLabel="Signing in..." />
        </form>
      </div>
    </main>
  );
}
