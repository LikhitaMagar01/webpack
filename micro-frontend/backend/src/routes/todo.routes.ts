import { FastifyInstance } from "fastify";
import { getTodos, createTodo, updateTodo, deleteTodo, getTodoById } from "../controllers/todo.controller";

export default async function todoRoutes(fastify: FastifyInstance) {
  fastify.get("/", getTodos);
  fastify.get("/todo/:id", getTodoById);
  fastify.post("/create", createTodo);
  fastify.put("/todo/update/:id", updateTodo);
  fastify.delete("/todo/delete/:id", deleteTodo);
}
