import { db } from "./db";
import { tutorials, type InsertTutorial, type Tutorial } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTutorials(): Promise<Tutorial[]>;
  getTutorialBySlug(slug: string): Promise<Tutorial | undefined>;
  createTutorial(tutorial: InsertTutorial): Promise<Tutorial>;
}

export class DatabaseStorage implements IStorage {
  async getTutorials(): Promise<Tutorial[]> {
    return await db.select().from(tutorials);
  }

  async getTutorialBySlug(slug: string): Promise<Tutorial | undefined> {
    const [tutorial] = await db.select().from(tutorials).where(eq(tutorials.slug, slug));
    return tutorial;
  }

  async createTutorial(insertTutorial: InsertTutorial): Promise<Tutorial> {
    const [tutorial] = await db.insert(tutorials).values(insertTutorial).returning();
    return tutorial;
  }
}

export const storage = new DatabaseStorage();