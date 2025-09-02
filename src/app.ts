import fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { getCoursesByIdRoute } from './routes/get-courses-by-id.ts'
import { createCoursesRoute } from './routes/create-course.ts'
import { getCoursesRoute } from './routes/get-courses.ts'
import scalarAPIReference from '@scalar/fastify-api-reference'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }
    }
  },
}).withTypeProvider<ZodTypeProvider>()

server.register(fastifySwagger,{
  openapi: {
    info: {
      title: 'Primeira API',
      description: 'API',
      version: '1.0.0',
    }
  },
  transform: jsonSchemaTransform,
})

server.register(scalarAPIReference, {
  routePrefix: '/docs',
})

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(getCoursesByIdRoute)
server.register(getCoursesRoute)
server.register(createCoursesRoute)

export { server }