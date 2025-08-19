import type { FastifyPluginAsyncZod} from 'fastify-type-provider-zod'
import { courses } from '../database/schema.ts'
import { db } from '../database/client.ts'
import { eq } from 'drizzle-orm'
import z from 'zod'


export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
server.get('/courses/:id', {
  schema: {
    tags: ['courses'],
    summary: 'Get a course by ID',
    description: 'This route retrieves a course by its ID.',
    params: z.object({
      id: z.uuid()
    }),
    response: {
      200: z.object({
        course: z.object({
          id: z.uuid(),
          title: z.string().min(2).max(100),
          description: z.string().nullable()
        })
      }),
      404: z.null().describe('Response when the course is not found'),
    }
  }
}, async (request, reply) => {
const courseId = request.params.id

  const result = await db
  .select()
  .from(courses)
  .where(eq(courses.id, courseId))

  if (result.length > 0) {
    return {course: result[0] }
  }

  return reply.status(404).send()
})
}