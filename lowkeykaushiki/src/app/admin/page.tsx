import { Edit3, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
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

export default async function AdminDashboard() {
  await requireAdmin();
  const posts = await listAllPosts();
  const mongoReady = hasMongoConfig();

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-4 border-b border-[#e8ded1] pb-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-[#9a4f58]">
              lowkeykaushiki admin
            </p>
            <h1 className="mt-1 text-4xl font-black tracking-normal text-[#2a2019]">
              Blog dashboard
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-2 rounded-[0.35rem] bg-[#2a2019] px-4 py-3 font-bold text-[#fbfaf6]"
            >
              <Plus className="h-4 w-4" />
              New post
            </Link>
            <form action={logoutAction}>
              <button className="rounded-[0.35rem] border border-[#cfae95] bg-[#fffefa] px-4 py-3 font-bold">
                Logout
              </button>
            </form>
          </div>
        </header>

        {!mongoReady ? (
          <div className="mt-6 rounded-[0.5rem] border border-[#d9a3a3] bg-[#fff0f0] p-4 text-sm font-semibold leading-6 text-[#9a4f58]">
            MongoDB is not configured yet. The dashboard is showing demo posts;
            add `MONGODB_URI` in `.env.local` before creating or editing real posts.
          </div>
        ) : null}

        <section className="mt-8 overflow-hidden rounded-[0.35rem] border border-[#e8ded1] bg-[#fffefa]">
          {posts.map((post) => (
            <div
              key={String(post._id)}
              className="grid gap-4 border-b border-[#e8ded1] p-5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#fbfaf6] px-3 py-1 text-xs font-bold text-[#9a4f58]">
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className="text-xs font-semibold text-[#75675d]">
                    {formatDate(post.updatedAt)}
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-black text-[#2a2019]">{post.title}</h2>
                <p className="mt-1 text-sm text-[#75675d]">/{post.slug}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/posts/${String(post._id)}/edit`}
                  className="inline-flex items-center gap-2 rounded-[0.5rem] border border-[#cfae95] px-3 py-2 text-sm font-bold"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Link>
                <form action={togglePublishedAction.bind(null, String(post._id), !post.published)}>
                  <button className="inline-flex items-center gap-2 rounded-[0.5rem] border border-[#cfae95] px-3 py-2 text-sm font-bold">
                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
                <form action={deletePostAction.bind(null, String(post._id))}>
                  <button className="inline-flex items-center gap-2 rounded-[0.5rem] border border-[#d9a3a3] px-3 py-2 text-sm font-bold text-[#9a4f58]">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
          {posts.length === 0 ? (
            <p className="p-6 text-[#75675d]">No posts yet. Start with a first note.</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
