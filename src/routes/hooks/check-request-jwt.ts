import type { FastifyRequest, FastifyReply } from 'fastify'
import jwt from 'jsonwebtoken'

type JwtPayload = { 
    sub: String,
    role: 'student' | 'manager'
}

export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply){
    const token = request.headers.authorization

    if(!token) {
        return reply.status(401).send()
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined')
      }
    
    try {  
      const payload = jwt.verify(token, process.env.JWT_SECRET) as unknown as JwtPayload

        request.user = payload
    } catch (error) {
      return reply.status(401).send()
    }
}