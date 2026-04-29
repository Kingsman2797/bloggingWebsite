import type { ObjectId } from "mongodb";

export type BlogPost = {
  _id?: ObjectId | string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
};
