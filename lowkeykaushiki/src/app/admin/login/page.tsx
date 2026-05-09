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
    <main className="grid min-h-screen place-items-center bg-[#fbfaf6] px-5">
      <div className="w-full max-w-md rounded-[0.35rem] border border-[#e8ded1] bg-[#fffefa] p-7 shadow-[10px_10px_0_#e8ded1]">
        <Logo />
        <div className="mt-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-[0.35rem] bg-[#2a2019] text-[#fbfaf6]">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-normal text-[#2a2019]">
              Admin login
            </h1>
            <p className="text-sm text-[#75675d]">For writing and editing posts.</p>
          </div>
        </div>
        {error ? (
          <p className="mt-5 rounded-[0.5rem] border border-[#d9a3a3] bg-[#fff0f0] p-3 text-sm font-semibold text-[#9a4f58]">
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
              className="rounded-[0.5rem] border border-[#dfc7b3] bg-white px-4 py-3 outline-none ring-[#b86f52]/20 focus:ring-4"
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
              className="rounded-[0.5rem] border border-[#dfc7b3] bg-white px-4 py-3 outline-none ring-[#b86f52]/20 focus:ring-4"
            />
          </div>
          <SubmitButton idleLabel="Sign in" pendingLabel="Signing in..." />
        </form>
      </div>
    </main>
  );
}
