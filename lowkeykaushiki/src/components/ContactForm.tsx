"use client";

import { Send } from "lucide-react";
import { useActionState } from "react";
import { sendContactMessage } from "@/app/actions";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, {
    ok: false,
    message: "",
  });

  return (
    <form action={action} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-bold text-[#3d3027]" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-[0.35rem] border border-[#cdbbaa] bg-[#fffefa] px-4 py-3 text-[#2a2019] outline-none ring-[#b86f52]/20 transition focus:border-[#b86f52] focus:ring-4"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-bold text-[#3d3027]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-[0.35rem] border border-[#cdbbaa] bg-[#fffefa] px-4 py-3 text-[#2a2019] outline-none ring-[#b86f52]/20 transition focus:border-[#b86f52] focus:ring-4"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-bold text-[#3d3027]" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="resize-none rounded-[0.35rem] border border-[#cdbbaa] bg-[#fffefa] px-4 py-3 text-[#2a2019] outline-none ring-[#b86f52]/20 transition focus:border-[#b86f52] focus:ring-4"
        />
      </div>
      <button
        className="inline-flex items-center justify-center gap-2 rounded-[0.35rem] bg-[#2a2019] px-5 py-3 font-bold text-[#fbfaf6] transition hover:-translate-y-0.5 hover:bg-[#4b382c] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        <Send className="h-4 w-4" />
        {pending ? "Sending..." : "Send message"}
      </button>
      {state.message ? (
        <p className={`text-sm font-semibold ${state.ok ? "text-[#557348]" : "text-[#9a4f58]"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
