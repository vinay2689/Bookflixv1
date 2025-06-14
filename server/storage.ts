import { users, books, bookChapters, reviews, type User, type InsertUser, type Book, type InsertBook, type BookChapter, type InsertChapter, type Review, type InsertReview, type BookWithReviews } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Book methods
  getAllBooks(): Promise<Book[]>;
  getBooksByGenre(genre: string): Promise<Book[]>;
  getBook(id: number): Promise<Book | undefined>;
  getBookWithReviews(id: number): Promise<BookWithReviews | undefined>;
  createBook(book: InsertBook): Promise<Book>;
  updateBook(id: number, updates: Partial<InsertBook>): Promise<Book | undefined>;
  searchBooks(query: string): Promise<Book[]>;

  // Chapter methods
  getBookChapters(bookId: number): Promise<BookChapter[]>;
  createChapter(chapter: InsertChapter): Promise<BookChapter>;
  updateChapter(id: number, updates: Partial<InsertChapter>): Promise<BookChapter | undefined>;

  // Review methods
  getBookReviews(bookId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private books: Map<number, Book>;
  private chapters: Map<number, BookChapter>;
  private reviews: Map<number, Review>;
  private currentUserId: number;
  private currentBookId: number;
  private currentChapterId: number;
  private currentReviewId: number;

  constructor() {
    this.users = new Map();
    this.books = new Map();
    this.chapters = new Map();
    this.reviews = new Map();
    this.currentUserId = 1;
    this.currentBookId = 1;
    this.currentChapterId = 1;
    this.currentReviewId = 1;

    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample books with realistic data
    const sampleBooks: InsertBook[] = [
      {
        title: "Dune",
        author: "Frank Herbert",
        synopsis: "Set in the distant future amidst a feudal interstellar society in which noble houses, in control of individual planets, owe allegiance to the Padishah Emperor, Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis.",
        genre: "Science Fiction",
        coverImageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        trailerVideoUrl: "https://www.youtube.com/embed/n9xhJrPXop4",
        amazonPurchaseUrl: "https://amazon.com/dp/0441172717",
        movieWatchUrl: "https://www.hbo.com/movies/dune",
        authorId: 1,
      },
      {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        synopsis: "Pride and Prejudice follows the turbulent relationship between Elizabeth Bennet, the daughter of a country gentleman, and Fitzwilliam Darcy, a rich aristocratic landowner.",
        genre: "Romance",
        coverImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        trailerVideoUrl: "https://www.youtube.com/embed/1dYv5u6v55Y",
        amazonPurchaseUrl: "https://amazon.com/dp/0141439513",
        movieWatchUrl: "https://www.netflix.com/title/70023048",
        authorId: 1,
      },
      {
        title: "1984",
        author: "George Orwell",
        synopsis: "Winston Smith works for the Ministry of Truth in London, chief city of Airstrip One. Big Brother stares out from every poster, the Thought Police uncover every act of betrayal.",
        genre: "Dystopian",
        coverImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        trailerVideoUrl: "https://www.youtube.com/embed/Z4rBDUJTnNU",
        amazonPurchaseUrl: "https://amazon.com/dp/0452284236",
        movieWatchUrl: "https://www.amazon.com/1984-John-Hurt/dp/B00AEBB1G8",
        authorId: 1,
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        synopsis: "In a hole in the ground there lived a hobbit. Written for J.R.R. Tolkien's own children, The Hobbit met with instant critical acclaim when it was first published in 1937.",
        genre: "Fantasy",
        coverImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
        trailerVideoUrl: "https://www.youtube.com/embed/SDnYMbYB-nU",
        amazonPurchaseUrl: "https://amazon.com/dp/054792822X",
        movieWatchUrl: "https://www.hbo.com/movies/the-hobbit-trilogy",
        authorId: 1,
      }
    ];

    sampleBooks.forEach(book => {
      const id = this.currentBookId++;
      const newBook: Book = {
        ...book,
        id,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 rating
        reviewCount: Math.floor(Math.random() * 15000) + 5000,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.books.set(id, newBook);
    });

    // Create sample reviews
    const sampleReviews = [
      { bookId: 1, rating: 5, comment: "An absolutely masterful piece of storytelling. The world-building is incredible!", source: "Goodreads" },
      { bookId: 1, rating: 4, comment: "Great adaptation potential! The visual descriptions are so vivid.", source: "Reddit" },
      { bookId: 2, rating: 5, comment: "A timeless classic that never gets old. Austen's wit is unmatched.", source: "BookOrigins" },
      { bookId: 3, rating: 5, comment: "More relevant today than ever. Chilling and prophetic.", source: "Goodreads" },
      { bookId: 4, rating: 4, comment: "Perfect introduction to Tolkien's world. Cozy and adventurous.", source: "Reddit" },
    ];

    sampleReviews.forEach(review => {
      const id = this.currentReviewId++;
      const newReview: Review = {
        ...review,
        id,
        userId: 1,
        createdAt: new Date(),
      };
      this.reviews.set(id, newReview);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => book.isPublished);
  }

  async getBooksByGenre(genre: string): Promise<Book[]> {
    return Array.from(this.books.values()).filter(book => 
      book.isPublished && book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  async getBook(id: number): Promise<Book | undefined> {
    return this.books.get(id);
  }

  async getBookWithReviews(id: number): Promise<BookWithReviews | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;

    const bookReviews = Array.from(this.reviews.values()).filter(review => review.bookId === id);
    return {
      ...book,
      reviews: bookReviews,
    };
  }

  async createBook(insertBook: InsertBook): Promise<Book> {
    const id = this.currentBookId++;
    const book: Book = {
      ...insertBook,
      id,
      rating: 0,
      reviewCount: 0,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.books.set(id, book);
    return book;
  }

  async updateBook(id: number, updates: Partial<InsertBook>): Promise<Book | undefined> {
    const book = this.books.get(id);
    if (!book) return undefined;

    const updatedBook: Book = {
      ...book,
      ...updates,
      updatedAt: new Date(),
    };
    this.books.set(id, updatedBook);
    return updatedBook;
  }

  async searchBooks(query: string): Promise<Book[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.books.values()).filter(book =>
      book.isPublished && (
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery)
      )
    );
  }

  async getBookChapters(bookId: number): Promise<BookChapter[]> {
    return Array.from(this.chapters.values())
      .filter(chapter => chapter.bookId === bookId)
      .sort((a, b) => a.chapterNumber - b.chapterNumber);
  }

  async createChapter(insertChapter: InsertChapter): Promise<BookChapter> {
    const id = this.currentChapterId++;
    const chapter: BookChapter = {
      ...insertChapter,
      id,
    };
    this.chapters.set(id, chapter);
    return chapter;
  }

  async updateChapter(id: number, updates: Partial<InsertChapter>): Promise<BookChapter | undefined> {
    const chapter = this.chapters.get(id);
    if (!chapter) return undefined;

    const updatedChapter: BookChapter = {
      ...chapter,
      ...updates,
    };
    this.chapters.set(id, updatedChapter);
    return updatedChapter;
  }

  async getBookReviews(bookId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.bookId === bookId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
