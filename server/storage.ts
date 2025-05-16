import { 
  users, 
  crystals, 
  favorites, 
  tests, 
  testResults, 
  savedDesigns, 
  blogPosts,
  type User, 
  type InsertUser,
  type Crystal,
  type InsertCrystal,
  type Favorite,
  type InsertFavorite,
  type Test,
  type InsertTest,
  type TestResult,
  type InsertTestResult,
  type SavedDesign,
  type InsertSavedDesign,
  type BlogPost,
  type InsertBlogPost
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Crystal methods
  getCrystal(id: number): Promise<Crystal | undefined>;
  getCrystalBySlug(slug: string): Promise<Crystal | undefined>;
  getCrystals(): Promise<Crystal[]>;
  createCrystal(crystal: InsertCrystal): Promise<Crystal>;

  // Favorites methods
  getFavoritesByUserId(userId: number): Promise<Favorite[]>;
  toggleFavorite(favorite: InsertFavorite): Promise<boolean>;
  checkFavorite(userId: number, crystalId: number): Promise<boolean>;

  // Test methods
  getTest(id: number): Promise<Test | undefined>;
  getTestBySlug(slug: string): Promise<Test | undefined>;
  getTests(): Promise<Test[]>;
  createTest(test: InsertTest): Promise<Test>;

  // Test results methods
  getTestResultsByUserId(userId: number): Promise<TestResult[]>;
  saveTestResult(testResult: InsertTestResult): Promise<TestResult>;

  // Saved designs methods
  getSavedDesignsByUserId(userId: number): Promise<SavedDesign[]>;
  saveDesign(design: InsertSavedDesign): Promise<SavedDesign>;

  // Blog posts methods
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Crystal methods
  async getCrystal(id: number): Promise<Crystal | undefined> {
    const [crystal] = await db.select().from(crystals).where(eq(crystals.id, id));
    return crystal;
  }

  async getCrystalBySlug(slug: string): Promise<Crystal | undefined> {
    const [crystal] = await db.select().from(crystals).where(eq(crystals.slug, slug));
    return crystal;
  }

  async getCrystals(): Promise<Crystal[]> {
    return db.select().from(crystals);
  }

  async createCrystal(crystal: InsertCrystal): Promise<Crystal> {
    const [newCrystal] = await db
      .insert(crystals)
      .values(crystal)
      .returning();
    return newCrystal;
  }

  // Favorites methods
  async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
    return db.select().from(favorites).where(eq(favorites.userId, userId));
  }

  async toggleFavorite(favorite: InsertFavorite): Promise<boolean> {
    // Check if favorite exists
    const [existingFavorite] = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, favorite.userId),
          eq(favorites.crystalId, favorite.crystalId)
        )
      );

    // If exists, remove it
    if (existingFavorite) {
      await db
        .delete(favorites)
        .where(eq(favorites.id, existingFavorite.id));
      return false; // Not favorited anymore
    }

    // If doesn't exist, add it
    await db.insert(favorites).values(favorite);
    return true; // Now favorited
  }

  async checkFavorite(userId: number, crystalId: number): Promise<boolean> {
    const [favorite] = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.crystalId, crystalId)
        )
      );
    return !!favorite;
  }

  // Test methods
  async getTest(id: number): Promise<Test | undefined> {
    const [test] = await db.select().from(tests).where(eq(tests.id, id));
    return test;
  }

  async getTestBySlug(slug: string): Promise<Test | undefined> {
    const [test] = await db.select().from(tests).where(eq(tests.slug, slug));
    return test;
  }

  async getTests(): Promise<Test[]> {
    return db.select().from(tests);
  }

  async createTest(test: InsertTest): Promise<Test> {
    const [newTest] = await db
      .insert(tests)
      .values(test)
      .returning();
    return newTest;
  }

  // Test results methods
  async getTestResultsByUserId(userId: number): Promise<TestResult[]> {
    return db.select().from(testResults).where(eq(testResults.userId, userId));
  }

  async saveTestResult(testResult: InsertTestResult): Promise<TestResult> {
    const [newResult] = await db
      .insert(testResults)
      .values(testResult)
      .returning();
    return newResult;
  }

  // Saved designs methods
  async getSavedDesignsByUserId(userId: number): Promise<SavedDesign[]> {
    return db.select().from(savedDesigns).where(eq(savedDesigns.userId, userId));
  }

  async saveDesign(design: InsertSavedDesign): Promise<SavedDesign> {
    const [newDesign] = await db
      .insert(savedDesigns)
      .values(design)
      .returning();
    return newDesign;
  }

  // Blog posts methods
  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return newPost;
  }
}

export const storage = new DatabaseStorage();
