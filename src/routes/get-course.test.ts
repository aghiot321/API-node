import { expect, test } from 'vitest';
import request from 'supertest'
import { server } from '../app.ts'
import { faker } from '@faker-js/faker';
import { makeCourse } from '../tersts/factories/make-course.ts';
import { randomUUID } from 'crypto';
import { makeUser } from '../tersts/factories/make-user.ts';
import { makeEnrollment } from '../tersts/factories/make-enrollments.ts';

test('get course', async () => {
  await server.ready()
  
  const titleId = randomUUID()
  
    const course = await makeCourse(titleId)
  
    const user = await makeUser()
  
    const enrollment = await makeEnrollment(course.id, user.id)


  
  const response = await request(server.server)
  .get(`/courses?search=${titleId}`)

  console.log(response.body)

  expect(response.status).toEqual(200)
  expect(response.body).toEqual({
    total: 1, 
    courses: [
      {
        id: expect.any(String),
        title: titleId,
          enrollments: 1
      }
    ]
})
}) 