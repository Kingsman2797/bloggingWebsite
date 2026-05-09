import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePostAction } from "@/app/admin/actions";
import { PostForm } from "@/components/PostForm";
import { requireAdmin } from "@/lib/auth";
import { getPostById } from "@/lib/posts";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-8">
      <div className="mx-auto max-w-3xl">
        <Link className="text-sm font-bold text-[var(--rose)]" href="/admin">
          Back to dashboard
        </Link>
        <h1 className="mt-5 text-4xl font-black tracking-normal text-[var(--foreground)]">
          Edit post
        </h1>
        <div className="mt-8 rounded-[0.35rem] border border-[var(--line)] bg-[var(--paper)] p-6">
          <PostForm action={updatePostAction.bind(null, id)} post={post} />
        </div>
      </div>
    </main>
  );
}
