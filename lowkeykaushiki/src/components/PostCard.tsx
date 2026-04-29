import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatDate, readingTime } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`modern-panel group grid overflow-hidden rounded-[0.35rem] border border-[#d8c8b9] bg-[#fffefa]/90 backdrop-blur transition hover:-translate-y-1 hover:border-[#b86f52]/60 ${
        featured ? "md:grid-cols-[1.1fr_0.9fr]" : ""
      }`}
    >
      {post.coverImage ? (
        <div
          className={`bg-cover bg-center ${featured ? "min-h-72 md:order-2" : "h-48"}`}
          style={{ backgroundImage: `url(${post.coverImage})` }}
        />
      ) : null}
      <article className="flex min-h-full flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e8ded1] bg-[#fbfaf6] px-3 py-1 text-xs font-bold text-[#7a3f34]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-2xl font-black tracking-normal text-[#2a2019]">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 text-sm font-medium leading-7 text-[#332920]">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-normal text-[#873f4b]">
          <span>
            {formatDate(post.createdAt)} · {readingTime(post.content)} min read
          </span>
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </article>
    </Link>
  );
}
