"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/actions";
import { SubmitButton } from "./SubmitButton";

export function ContactForm() {
  const [state, action] = useActionState(sendContactMessage, {
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
      <SubmitButton idleLabel="Send message" pendingLabel="Sending..." />
      {state.message ? (
        <p className={`text-sm font-semibold ${state.ok ? "text-[#557348]" : "text-[#9a4f58]"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
