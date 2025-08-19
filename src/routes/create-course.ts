import type { FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { courses } from '../database/schema.ts'
import { db } from '../database/client.ts'
import { z } from 'zod'


export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
server.post('/courses', {
  schema: {
    tags: ['courses'],
    summary: 'Create a new course',
    description: 'This route allows you to create a new course.',
    body: z.object({
      title: z.string().min(2, 'Título muito curto').max(100, 'Título muito longo')
    }),
    response: {
      201: z.object({
        courseId: z.string().uuid()
      }).describe('Response when the course is created successfully'),
    }
  },
},  async (request, reply) =>{
    const courseTitle = request.body.title

    const result = await db
    .insert(courses)
    .values({title: courseTitle})
    .returning()

    return reply.status(201).send({courseId: result[0].id})
})
}