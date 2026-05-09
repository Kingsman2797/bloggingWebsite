import type { BlogPost } from "@/lib/types";
import { RichTextEditor } from "./RichTextEditor";
import { SubmitButton } from "./SubmitButton";

export function PostForm({
  action,
  post,
}: {
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPost;
}) {
  return (
    <form action={action} className="grid gap-5">
      <Field label="Title" name="title" required defaultValue={post?.title} />
      <Field
        label="Slug"
        name="slug"
        placeholder="auto-generated from title if left blank"
        defaultValue={post?.slug}
      />
      <div className="grid gap-2">
        <label className="text-sm font-bold text-[#3d3027]" htmlFor="excerpt">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className="resize-none rounded-[0.5rem] border border-[#dfc7b3] bg-white px-4 py-3 outline-none ring-[#b86f52]/20 focus:ring-4"
        />
      </div>
      <Field
        label="Cover image URL"
        name="coverImage"
        required
        defaultValue={post?.coverImage}
      />
      <Field
        label="Tags"
        name="tags"
        placeholder="personal, writing, notes"
        defaultValue={post?.tags.join(", ")}
      />
      <div className="grid gap-2">
        <label className="text-sm font-bold text-[#3d3027]" htmlFor="content">
          Content
        </label>
        <RichTextEditor name="content" defaultValue={post?.content} />
      </div>
      <label className="flex items-center gap-3 text-sm font-bold text-[#3d3027]">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? true}
          className="h-4 w-4 accent-[#b86f52]"
        />
        Publish this post
      </label>
      <SubmitButton idleLabel="Save post" pendingLabel="Saving..." />
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-bold text-[#3d3027]" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="rounded-[0.5rem] border border-[#dfc7b3] bg-white px-4 py-3 outline-none ring-[#b86f52]/20 focus:ring-4"
      />
    </div>
  );
}
