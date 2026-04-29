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
          <div className="type-chip inline-flex items-center gap-2 rounded-full border border-[#d8c8b9] bg-[#fffefa]/85 px-4 py-2 text-sm font-bold text-[#8e4350] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            STATUS: quiet thoughts online
          </div>
          <h1 className="typewriter-title mt-8 text-4xl font-black leading-[1.12] tracking-normal text-[#2a2019] sm:text-5xl md:text-7xl">
            A lowkey corner for essays, notes, and becoming.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#51443a] md:text-lg">
            lowkeykaushiki is a personal blog with a warm desk-lamp mood:
            reflective writing, small observations, and the occasional honest
            dispatch from life online and offline.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#journal"
              className="rounded-[0.35rem] bg-[#2a2019] px-5 py-3 font-bold text-[#fbfaf6] transition hover:bg-[#4b382c]"
            >
              Read the journal
            </a>
            <a
              href="#contact"
              className="rounded-[0.35rem] border border-[#cfae95] bg-[#fffefa] px-5 py-3 font-bold text-[#2a2019] transition hover:border-[#b86f52]"
            >
              Say hello
            </a>
          </div>
        </div>
        <div className="modern-panel relative min-h-[420px] overflow-hidden rounded-[0.45rem] border border-[#d8c8b9] bg-[#fffefa]/88 p-5 backdrop-blur shadow-[12px_12px_0_#e8ded1]">
          <div className="absolute inset-x-0 top-0 h-28 bg-[#f4b183]" />
          <div className="scanline relative mt-10 rounded-[0.35rem] border border-[#2a2019] bg-[#fbfaf6] p-6 shadow-[8px_8px_0_#2a2019]">
            <div className="h-48 rounded-[0.35rem] bg-[linear-gradient(135deg,#2a2019_0_20%,#b86f52_20%_48%,#f4b183_48%_72%,#687d61_72%)]" />
            <div className="mt-6">
              <p className="text-sm font-black uppercase tracking-normal text-[#9a4f58]">
                ./profile
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-normal">
                Kaushiki, probably writing between two thoughts.
              </h2>
              <p className="mt-4 leading-7 text-[#51443a]">
                A profile space designed to feel personal without oversharing:
                warm colors, sharp typography, and a little handmade energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="journal" className="border-y border-[#d8c8b9] bg-[#fffefa]/82 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-[#9a4f58]">
                Journal
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-normal text-[#2a2019]">
                Latest posts
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#51443a]">
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
            <p className="rounded-[0.35rem] border border-[#e8ded1] bg-[#fbfaf6] p-6 text-[#51443a]">
              No published posts yet.
            </p>
          )}
        </div>
      </section>

      <section id="contact" className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-[0.5rem] bg-[#b86f52] text-white">
            <Mail className="h-5 w-5" />
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-normal text-[#9a4f58]">
            Contact
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-normal text-[#2a2019]">
            Send a note directly.
          </h2>
          <p className="mt-4 leading-7 text-[#51443a]">
            Messages from this form are sent to your inbox using Resend. Add
            your email variables before deployment and the form is ready.
          </p>
        </div>
        <div className="modern-panel rounded-[0.45rem] border border-[#d8c8b9] bg-[#fffefa]/88 p-6 backdrop-blur">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
