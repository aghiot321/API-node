import { expect, test } from 'vitest';
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker';
import { makeUser } from '../tersts/factories/make-user.ts';
import { email } from 'zod';

test('login', async () => {
  await server.ready()

  const { user, passwordWithoutHash } = await makeUser()

  const response = await request(server.server)
  .post('/sessions')
  .set('Content-Type', 'application/json')
  .send({ 
    email: user.email,
    password: passwordWithoutHash
  })


  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
   token: expect.any(String),
  })
})
