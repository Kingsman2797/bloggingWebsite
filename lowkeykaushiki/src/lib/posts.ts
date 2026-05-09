import { ObjectId } from "mongodb";
import { getDb, hasMongoConfig } from "./mongodb";
import type { BlogPost, PostInput } from "./types";

type FallbackCategory = "nature" | "street" | "city" | "places" | "art";

const fallbackImages: Record<FallbackCategory, string[]> = {
  nature: [
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
  ],
  street: [
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  ],
  city: [
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1c?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1400&q=80",
  ],
  places: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
  ],
  art: [
    "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1400&q=80",
  ],
};

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

function inferFallbackCategory(post: Pick<PostInput, "title" | "tags" | "excerpt" | "content">): FallbackCategory {
  const text = `${post.title} ${post.excerpt} ${post.content} ${post.tags.join(" ")}`.toLowerCase();

  if (/(nature|forest|river|mountain|sky|ocean|sea|beach|tree|sunset|sunrise)/.test(text)) {
    return "nature";
  }

  if (/(street|road|people|crowd|market|walk|walks|walking|daily|urban)/.test(text)) {
    return "street";
  }

  if (/(city|cities|metro|skyscraper|tower|building|urban|downtown|nightlife)/.test(text)) {
    return "city";
  }

  if (/(place|travel|trip|journey|home|space|room|station|cafe|gallery|hotel)/.test(text)) {
    return "places";
  }

  return "art";
}

function categoryFallbackImage(post: Pick<PostInput, "title" | "tags" | "excerpt" | "content">) {
  const category = inferFallbackCategory(post);
  const list = fallbackImages[category];
  const seed = `${post.title}-${post.tags.join(",")}-${post.excerpt}`.length;
  return list[seed % list.length];
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

  try {
    const db = await getDb();
    return collection(db)
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
  } catch {
    return demoPosts;
  }
}

export async function listAllPosts() {
  if (!hasMongoConfig()) {
    return demoPosts;
  }

  try {
    const db = await getDb();
    return collection(db).find({}).sort({ createdAt: -1 }).toArray();
  } catch {
    return demoPosts;
  }
}

export async function getPostBySlug(slug: string) {
  if (!hasMongoConfig()) {
    return demoPosts.find((post) => post.slug === slug && post.published) || null;
  }

  try {
    const db = await getDb();
    return collection(db).findOne({ slug, published: true });
  } catch {
    return demoPosts.find((post) => post.slug === slug && post.published) || null;
  }
}

export async function getPostById(id: string) {
  if (!hasMongoConfig()) {
    return demoPosts.find((post) => String(post._id) === id) || null;
  }

  try {
    const db = await getDb();
    return collection(db).findOne({ _id: new ObjectId(id) });
  } catch {
    return demoPosts.find((post) => String(post._id) === id) || null;
  }
}

export async function createPost(input: PostInput) {
  const db = await getDb();
  const now = new Date();
  const post: BlogPost = {
    ...input,
    coverImage: input.coverImage || categoryFallbackImage(input),
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
    {
      $set: {
        ...input,
        coverImage: input.coverImage || categoryFallbackImage(input),
        updatedAt: new Date(),
      },
    },
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
