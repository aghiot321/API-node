import { expect, test } from 'vitest';
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker';
import { makeCourse } from '../tersts/factories/make-course.ts';
import { makeEnrollment } from '../tersts/factories/make-enrollments.ts';
import { makeAuthenticatedUser, makeUser } from '../tersts/factories/make-user.ts';

test('get course by id', async () => {
  await server.ready()


  const { token } = await makeAuthenticatedUser('student')
  const course = await makeCourse()
  


  const response = await request(server.server)
  .get(`/courses/${course.id}`)
  .set('Authorization', token)

  

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
   course:{
    id: expect.any(String),
    title: expect.any(String), 
    description: null, 
   
   }
  })
})

test('return 404 for non existing course', async () => {
  await server.ready()

  const { token } = await makeAuthenticatedUser('student')

  const response = await request(server.server)
    .get(`/courses/1bf3aa7e-b548-47bf-952c-5e0d6d8654e5`)
    .set('Authorization', token)
  expect(response.status).toEqual(404)
})
