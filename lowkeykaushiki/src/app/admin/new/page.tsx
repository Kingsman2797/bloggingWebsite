import Link from "next/link";
import { createPostAction } from "../actions";
import { PostForm } from "@/components/PostForm";
import { requireAdmin } from "@/lib/auth";

export default async function NewPostPage() {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-[#fbfaf6] px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <Link className="text-sm font-bold text-[#9a4f58]" href="/admin">
          Back to dashboard
        </Link>
        <h1 className="mt-5 text-4xl font-black tracking-normal text-[#2a2019]">
          New post
        </h1>
        <div className="mt-8 rounded-[0.35rem] border border-[#e8ded1] bg-[#fffefa] p-6">
          <PostForm action={createPostAction} />
        </div>
      </div>
    </main>
  );
}
