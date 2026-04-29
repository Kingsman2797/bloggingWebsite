import { ObjectId } from "mongodb";
import { getDb, hasMongoConfig } from "./mongodb";
import type { BlogPost, PostInput } from "./types";

const demoPosts: BlogPost[] = [
  {
    _id: "demo-1",
    title: "A soft place to begin",
    slug: "a-soft-place-to-begin",
    excerpt:
      "Notes on building a tiny internet room for thoughts, drafts, and half-finished wonder.",
    content:
      "<h2>A tiny beginning</h2><p>This space is meant to feel low-pressure: a desk by a window, a notebook left open, a little corner of the web where thoughts can arrive without needing to perform.</p><p>The first version of a blog does not need to be grand. It needs a place to write, a way to publish, and enough warmth that returning to it feels inviting.</p>",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    tags: ["personal", "notes"],
    published: true,
    createdAt: new Date("2026-04-01T08:00:00.000Z"),
    updatedAt: new Date("2026-04-01T08:00:00.000Z"),
  },
  {
    _id: "demo-2",
    title: "Lowkey rituals",
    slug: "lowkey-rituals",
    excerpt:
      "A few small routines that make writing feel more like showing up than wrestling the blank page.",
    content:
      "<h2>Lowkey rituals</h2><p>Some days the best writing ritual is just making tea, opening the editor, and giving yourself ten honest minutes.</p><p>Small rituals matter because they remove drama from the work. They make starting feel ordinary, and ordinary is where most good pages are made.</p>",
    coverImage:
      "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?auto=format&fit=crop&w=1400&q=80",
    tags: ["writing", "routine"],
    published: true,
    createdAt: new Date("2026-03-18T08:00:00.000Z"),
    updatedAt: new Date("2026-03-18T08:00:00.000Z"),
  },
];

function collectionName() {
  return process.env.MONGODB_COLLECTION || "posts";
}

function collection(db: Awaited<ReturnType<typeof getDb>>) {
  return db.collection<BlogPost>(collectionName());
}

export function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listPublishedPosts() {
  if (!hasMongoConfig()) {
    return demoPosts;
  }

  const db = await getDb();
  return collection(db)
    .find({ published: true })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function listAllPosts() {
  if (!hasMongoConfig()) {
    return demoPosts;
  }

  const db = await getDb();
  return collection(db).find({}).sort({ createdAt: -1 }).toArray();
}

export async function getPostBySlug(slug: string) {
  if (!hasMongoConfig()) {
    return demoPosts.find((post) => post.slug === slug && post.published) || null;
  }

  const db = await getDb();
  return collection(db).findOne({ slug, published: true });
}

export async function getPostById(id: string) {
  if (!hasMongoConfig()) {
    return demoPosts.find((post) => String(post._id) === id) || null;
  }

  const db = await getDb();
  return collection(db).findOne({ _id: new ObjectId(id) });
}

export async function createPost(input: PostInput) {
  const db = await getDb();
  const now = new Date();
  const post: BlogPost = {
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  await collection(db).createIndex({ slug: 1 }, { unique: true });
  return collection(db).insertOne(post);
}

export async function updatePost(id: string, input: PostInput) {
  const db = await getDb();
  return collection(db).updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...input, updatedAt: new Date() } },
  );
}

export async function deletePost(id: string) {
  const db = await getDb();
  return collection(db).deleteOne({ _id: new ObjectId(id) });
}

export async function togglePostPublished(id: string, published: boolean) {
  const db = await getDb();
  return collection(db).updateOne(
    { _id: new ObjectId(id) },
    { $set: { published, updatedAt: new Date() } },
  );
}
