"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost,
  deletePost,
  makeSlug,
  togglePostPublished,
  updatePost,
} from "@/lib/posts";
import { createSession, destroySession, isValidAdmin, requireAdmin } from "@/lib/auth";
import type { PostInput } from "@/lib/types";

function postInputFromForm(formData: FormData): PostInput {
  const title = String(formData.get("title") || "").trim();
  const slugValue = String(formData.get("slug") || "").trim();
  const content = cleanRichHtml(String(formData.get("content") || "").trim());
  const excerpt = String(formData.get("excerpt") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim();
  const tags = String(formData.get("tags") || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!title || !content || !excerpt) {
    throw new Error("Title, excerpt, and content are required.");
  }

  return {
    title,
    slug: makeSlug(slugValue || title),
    excerpt,
    content,
    coverImage,
    tags,
    published: formData.get("published") === "on",
  };
}

function cleanRichHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  if (!isValidAdmin(username, password)) {
    redirect("/admin/login?error=1");
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  await createPost(postInputFromForm(formData));
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireAdmin();
  await updatePost(id, postInputFromForm(formData));
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await deletePost(id);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function togglePublishedAction(id: string, published: boolean) {
  await requireAdmin();
  await togglePostPublished(id, published);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
