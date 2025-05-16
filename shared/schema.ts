import { pgTable, text, serial, integer, boolean, timestamp, uniqueIndex, foreignKey, json, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  savedDesigns: many(savedDesigns),
  testResults: many(testResults),
}));

// Crystals table
export const crystals = pgTable("crystals", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  longDescription: text("long_description").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  properties: jsonb("properties").notNull().$type<string[]>(),
  chakras: jsonb("chakras").notNull().$type<string[]>(),
  zodiacSigns: jsonb("zodiac_signs").notNull().$type<string[]>(),
  elements: jsonb("elements").notNull().$type<string[]>(),
});

// Crystal relations
export const crystalsRelations = relations(crystals, ({ many }) => ({
  favorites: many(favorites),
}));

// Favorites table
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  crystalId: integer("crystal_id").notNull().references(() => crystals.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => {
  return {
    userCrystalUnique: uniqueIndex("user_crystal_unique").on(table.userId, table.crystalId),
  };
});

// Favorites relations
export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  crystal: one(crystals, {
    fields: [favorites.crystalId],
    references: [crystals.id],
  }),
}));

// Tests table
export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  color: text("color").notNull(),
  buttonColor: text("button_color").notNull(),
  questions: jsonb("questions").notNull(),
  results: jsonb("results").notNull(),
});

// Test results table
export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  testId: integer("test_id").notNull().references(() => tests.id, { onDelete: 'cascade' }),
  testName: text("test_name").notNull(),
  resultScore: text("result_score").notNull(),
  answers: jsonb("answers").notNull(),
  date: timestamp("date").defaultNow(),
});

// Test results relations
export const testResultsRelations = relations(testResults, ({ one }) => ({
  user: one(users, {
    fields: [testResults.userId],
    references: [users.id],
  }),
  test: one(tests, {
    fields: [testResults.testId],
    references: [tests.id],
  }),
}));

// Saved designs table
export const savedDesigns = pgTable("saved_designs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  itemType: text("item_type").notNull(),
  crystal: text("crystal").notNull(),
  material: text("material").notNull(),
  length: text("length").notNull(),
  date: timestamp("date").defaultNow(),
});

// Saved designs relations
export const savedDesignsRelations = relations(savedDesigns, ({ one }) => ({
  user: one(users, {
    fields: [savedDesigns.userId],
    references: [users.id],
  }),
}));

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  date: timestamp("date").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  coverImage: text("cover_image").notNull(),
  content: jsonb("content").notNull().$type<string[]>(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertCrystalSchema = createInsertSchema(crystals);
export const insertFavoriteSchema = createInsertSchema(favorites).pick({
  userId: true,
  crystalId: true,
});
export const insertTestSchema = createInsertSchema(tests);
export const insertTestResultSchema = createInsertSchema(testResults).pick({
  userId: true,
  testId: true,
  testName: true,
  resultScore: true,
  answers: true,
});
export const insertSavedDesignSchema = createInsertSchema(savedDesigns).pick({
  userId: true,
  itemType: true,
  crystal: true,
  material: true,
  length: true,
});
export const insertBlogPostSchema = createInsertSchema(blogPosts);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCrystal = z.infer<typeof insertCrystalSchema>;
export type Crystal = typeof crystals.$inferSelect;

export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favorites.$inferSelect;

export type InsertTest = z.infer<typeof insertTestSchema>;
export type Test = typeof tests.$inferSelect;

export type InsertTestResult = z.infer<typeof insertTestResultSchema>;
export type TestResult = typeof testResults.$inferSelect;

export type InsertSavedDesign = z.infer<typeof insertSavedDesignSchema>;
export type SavedDesign = typeof savedDesigns.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
