import { FastifyInstance } from "fastify";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todo.controller";

export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.get("/", getTodos);
  fastify.post("/", createTodo);
  fastify.put("/:id", updateTodo);
  fastify.delete("/:id", deleteTodo);
}
