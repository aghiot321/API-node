import { faker } from "@faker-js/faker";
import { users } from "../../database/schema.ts";
import { db } from "../../database/client.ts";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

export async function makeUser(role?: 'student' | 'manager') {
  
  const passwordWithoutHash = randomUUID()
  
  const result = await db.insert(users).values({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: await hash(passwordWithoutHash),
    role,

  }).returning();
  
  return {
    user: result[0],
    passwordWithoutHash,
  }
}

export async function makeAuthenticatedUser(role: 'student' | 'manager') {
  const { user } = await makeUser(role)

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  const token = jwt.sign({ sub: user.id, role: user.role}, process.env.JWT_SECRET)
  
  return { user, token }
}
  
  