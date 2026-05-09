import { Mail, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PostCard } from "@/components/PostCard";
import { SiteHeader } from "@/components/SiteHeader";
import { listPublishedPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await listPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-transparent">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
        <div>
          <div className="type-chip inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_85%,transparent)] px-4 py-2 text-sm font-bold text-[var(--rose)] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            STATUS: quiet thoughts online
          </div>
          <h1 className="typewriter-title mt-8 text-4xl font-black leading-[1.12] tracking-normal text-[var(--foreground)] sm:text-5xl md:text-7xl">
            A lowkey corner for essays, notes, and becoming.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            lowkeykaushiki is a personal blog with a warm desk-lamp mood:
            reflective writing, small observations, and the occasional honest
            dispatch from life online and offline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#journal"
            className="rounded-[0.35rem] bg-[var(--foreground)] px-5 py-3 font-bold text-[var(--background)] transition hover:opacity-90"
            >
              Read the journal
            </a>
            <a
              href="#contact"
            className="rounded-[0.35rem] border border-[var(--line)] bg-[var(--paper)] px-5 py-3 font-bold text-[var(--foreground)] transition hover:border-[var(--clay)]/60"
            >
              Say hello
            </a>
          </div>
        </div>
        <div className="modern-panel relative min-h-[420px] overflow-hidden rounded-[0.45rem] border border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] p-5 backdrop-blur shadow-[12px_12px_0_var(--line)]">
          <div className="absolute inset-x-0 top-0 h-28 bg-[var(--clay)]" />
          <div className="scanline relative mt-10 rounded-[0.35rem] border border-[var(--foreground)] bg-[var(--background)] p-6 shadow-[8px_8px_0_var(--foreground)]">
            <div className="h-48 rounded-[0.35rem] bg-[linear-gradient(135deg,var(--foreground)_0_20%,var(--clay)_20%_48%,#f4b183_48%_72%,var(--sage)_72%)]" />
            <div className="mt-6">
              <p className="text-sm font-black uppercase tracking-normal text-[var(--rose)]">
                ./profile
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-[var(--foreground)]">
                Kaushiki, probably writing between two thoughts.
              </h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                A profile space designed to feel personal without oversharing:
                warm colors, sharp typography, and a little handmade energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="journal" className="border-y border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_82%,transparent)] backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-[var(--rose)]">
                Journal
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal text-[var(--foreground)]">
                Latest posts
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[var(--muted)]">
              Freshly published entries appear here. When MongoDB is connected,
              the admin dashboard controls this list.
            </p>
          </div>
          {featured ? (
            <div className="grid gap-6">
              <PostCard post={featured} featured />
              <div className="grid gap-6 md:grid-cols-2">
                {rest.map((post) => (
                  <PostCard key={String(post._id)} post={post} />
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-[0.35rem] border border-[var(--line)] bg-[var(--background)] p-6 text-[var(--muted)]">
              No published posts yet.
            </p>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.5rem] bg-[var(--clay)] text-[var(--background)]">
            <Mail className="h-5 w-5" />
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-normal text-[var(--rose)]">
            Contact
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-normal text-[var(--foreground)]">
            Send a note directly.
          </h2>
          <p className="mt-4 leading-7 text-[var(--muted)]">
            Messages from this form are sent to your inbox using Resend. Add
            your email variables before deployment and the form is ready.
          </p>
        </div>
        <div className="modern-panel rounded-[0.45rem] border border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] p-6 backdrop-blur">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
