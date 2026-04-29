"use server";

import { Resend } from "resend";

type ContactState = {
  ok: boolean;
  message: string;
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill out every field." };
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    return {
      ok: false,
      message: "Email is not configured yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.CONTACT_FROM_EMAIL || "lowkeykaushiki <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return { ok: true, message: "Message sent. Thank you for writing in." };
}
