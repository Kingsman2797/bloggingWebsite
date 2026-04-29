import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { RichContent } from "@/components/RichContent";
import { SiteHeader } from "@/components/SiteHeader";
import { formatDate, formatDateTime, readingTime } from "@/lib/format";
import { getPostBySlug, listPublishedPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await listPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <SiteHeader />
      <article>
        <header className="mx-auto max-w-4xl px-5 py-14">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e8ded1] bg-[#fffefa] px-3 py-1 text-xs font-bold text-[#7a3f34]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-normal text-[#2a2019] md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#332920]">
            {post.excerpt}
          </p>
          <p className="mt-5 text-sm font-bold text-[#873f4b]">
            {formatDate(post.createdAt)} · {readingTime(post.content)} min read
          </p>
        </header>
        {post.coverImage ? (
          <div className="mx-auto max-w-5xl px-5">
            <div
              className="h-[420px] rounded-[0.35rem] border border-[#e8ded1] bg-cover bg-center"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
            <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-[#e8ded1] bg-[#fffefa] px-4 py-2 text-sm font-bold text-[#873f4b] shadow-sm">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={new Date(post.createdAt).toISOString()}>
                Published {formatDateTime(post.createdAt)}
              </time>
            </div>
          </div>
        ) : null}
        <div className="mx-auto max-w-3xl px-5 py-12">
          <RichContent content={post.content} />
        </div>
      </article>
    </main>
  );
}
