import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db"

const fastify = Fastify({ logger: true})

fastify.register(cors);

fastify.get('/', async(request, reply) => {
    return { message: 'Hello from Fastify'};
})

const startServer = async () => {
    try {
        await connectDB();
        fastify.listen({ port: 5000 })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

startServer()