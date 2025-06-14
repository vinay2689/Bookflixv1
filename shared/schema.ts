import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  isCreator: boolean("is_creator").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  synopsis: text("synopsis").notNull(),
  genre: text("genre").notNull(),
  coverImageUrl: text("cover_image_url"),
  trailerVideoUrl: text("trailer_video_url"),
  amazonPurchaseUrl: text("amazon_purchase_url"),
  movieWatchUrl: text("movie_watch_url"),
  rating: integer("rating").default(0),
  reviewCount: integer("review_count").default(0),
  isPublished: boolean("is_published").default(false),
  authorId: integer("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookChapters = pgTable("book_chapters", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  chapterNumber: integer("chapter_number").notNull(),
  wordCount: integer("word_count").default(0),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").references(() => books.id),
  userId: integer("user_id").references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  source: text("source").default("BookOrigins"), // "BookOrigins", "Goodreads", "Reddit"
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  isCreator: true,
});

export const insertBookSchema = createInsertSchema(books).pick({
  title: true,
  author: true,
  synopsis: true,
  genre: true,
  coverImageUrl: true,
  trailerVideoUrl: true,
  amazonPurchaseUrl: true,
  movieWatchUrl: true,
  authorId: true,
});

export const insertChapterSchema = createInsertSchema(bookChapters).pick({
  bookId: true,
  title: true,
  content: true,
  chapterNumber: true,
  wordCount: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  bookId: true,
  userId: true,
  rating: true,
  comment: true,
  source: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof books.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type BookChapter = typeof bookChapters.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type BookWithReviews = Book & {
  reviews: Review[];
};

export type BookWithChapters = Book & {
  chapters: BookChapter[];
};
