import { Edit3, Plus } from "lucide-react";
import Link from "next/link";
import {
  deletePostAction,
  logoutAction,
  togglePublishedAction,
} from "./actions";
import { formatDate } from "@/lib/format";
import { requireAdmin } from "@/lib/auth";
import { listAllPosts } from "@/lib/posts";
import { hasMongoConfig } from "@/lib/mongodb";
import { SubmitButton } from "@/components/SubmitButton";

export default async function AdminDashboard() {
  await requireAdmin();
  const posts = await listAllPosts();
  const mongoReady = hasMongoConfig();

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 border-b border-[var(--line)] pb-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-[var(--rose)]">
              lowkeykaushiki admin
            </p>
            <h1 className="mt-1 text-4xl font-black tracking-normal text-[var(--foreground)]">
              Blog dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-2 rounded-[0.35rem] bg-[var(--foreground)] px-4 py-3 font-bold text-[var(--background)]"
            >
              <Plus className="h-4 w-4" />
              New post
            </Link>
            <form action={logoutAction}>
              <SubmitButton idleLabel="Logout" pendingLabel="Logging out..." />
            </form>
          </div>
        </header>

        {!mongoReady ? (
          <div className="mt-6 rounded-[0.5rem] border border-[color-mix(in_srgb,var(--rose)_25%,var(--line))] bg-[color-mix(in_srgb,var(--rose)_12%,var(--paper))] p-4 text-sm font-semibold leading-6 text-[var(--rose)]">
            MongoDB is not configured yet. The dashboard is showing demo posts;
            add `MONGODB_URI` in `.env.local` before creating or editing real posts.
          </div>
        ) : null}

        <section className="mt-8 overflow-hidden rounded-[0.35rem] border border-[var(--line)] bg-[var(--paper)]">
          {posts.map((post) => (
            <div
              key={String(post._id)}
              className="grid gap-4 border-b border-[var(--line)] p-5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-bold text-[var(--rose)]">
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs font-semibold text-[var(--muted)]">
                    {formatDate(post.updatedAt)}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-black text-[var(--foreground)]">{post.title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">/{post.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/posts/${String(post._id)}/edit`}
                  className="inline-flex items-center gap-2 rounded-[0.5rem] border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm font-bold text-[var(--foreground)]"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Link>
                <form action={togglePublishedAction.bind(null, String(post._id), !post.published)}>
                  <SubmitButton
                    idleLabel={post.published ? "Unpublish" : "Publish"}
                    pendingLabel={post.published ? "Unpublishing..." : "Publishing..."}
                    className="px-3 py-2 text-sm"
                  />
                </form>
                <form action={deletePostAction.bind(null, String(post._id))}>
                  <SubmitButton
                    idleLabel="Delete"
                    pendingLabel="Deleting..."
                    className="border border-[color-mix(in_srgb,var(--rose)_25%,var(--line))] bg-[color-mix(in_srgb,var(--rose)_12%,var(--paper))] px-3 py-2 text-sm text-[var(--rose)] hover:bg-[color-mix(in_srgb,var(--rose)_18%,var(--paper))]"
                  />
                </form>
              </div>
            </div>
          ))}
          {posts.length === 0 ? (
            <p className="p-6 text-[var(--muted)]">No posts yet. Start with a first note.</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
