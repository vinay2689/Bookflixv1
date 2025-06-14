import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookSchema, insertChapterSchema, insertReviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all books
  app.get("/api/books", async (req, res) => {
    try {
      const { genre, search } = req.query;
      
      let books;
      if (search) {
        books = await storage.searchBooks(search as string);
      } else if (genre && genre !== "all") {
        books = await storage.getBooksByGenre(genre as string);
      } else {
        books = await storage.getAllBooks();
      }
      
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  // Get book by id with reviews
  app.get("/api/books/:id", async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const book = await storage.getBookWithReviews(bookId);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch book" });
    }
  });

  // Create new book
  app.post("/api/books", async (req, res) => {
    try {
      const bookData = insertBookSchema.parse(req.body);
      const book = await storage.createBook(bookData);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: "Invalid book data" });
    }
  });

  // Update book
  app.patch("/api/books/:id", async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const updates = req.body;
      const book = await storage.updateBook(bookId, updates);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      res.json(book);
    } catch (error) {
      res.status(500).json({ message: "Failed to update book" });
    }
  });

  // Get book chapters
  app.get("/api/books/:id/chapters", async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const chapters = await storage.getBookChapters(bookId);
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chapters" });
    }
  });

  // Create new chapter
  app.post("/api/chapters", async (req, res) => {
    try {
      const chapterData = insertChapterSchema.parse(req.body);
      const chapter = await storage.createChapter(chapterData);
      res.status(201).json(chapter);
    } catch (error) {
      res.status(400).json({ message: "Invalid chapter data" });
    }
  });

  // Update chapter
  app.patch("/api/chapters/:id", async (req, res) => {
    try {
      const chapterId = parseInt(req.params.id);
      const updates = req.body;
      const chapter = await storage.updateChapter(chapterId, updates);
      
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      
      res.json(chapter);
    } catch (error) {
      res.status(500).json({ message: "Failed to update chapter" });
    }
  });

  // Get book reviews
  app.get("/api/books/:id/reviews", async (req, res) => {
    try {
      const bookId = parseInt(req.params.id);
      const reviews = await storage.getBookReviews(bookId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Create new review
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
