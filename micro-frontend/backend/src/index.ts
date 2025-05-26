import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db"
import todoRoutes from "./routes/todo.routes";
import profileRoutes from "./routes/profile.routes";

const fastify = Fastify({ logger: true})

fastify.register(cors, {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});

fastify.get('/', async(request, reply) => {
    return { message: 'Hello from Fastify'};
})

fastify.register(todoRoutes, { prefix: "/api/todos" })
fastify.register(profileRoutes, { prefix: "/api/profiles" })

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