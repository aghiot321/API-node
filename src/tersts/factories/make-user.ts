import { faker } from "@faker-js/faker";
import { users } from "../../database/schema.ts";
import { db } from "../../database/client.ts";

export async function makeUser() {
  const result = await db.insert(users).values({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }).returning();
  return result[0];
}