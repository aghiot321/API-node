import { faker } from "@faker-js/faker";
import { enrollments } from "../../database/schema.ts";
import { db } from "../../database/client.ts";

export async function makeEnrollment(courseId: string, userId?: string) {
  const result = await db.insert(enrollments).values({
    courseId,
    userId: userId ?? faker.string.uuid(),
  }).returning();

  return result[0];
}