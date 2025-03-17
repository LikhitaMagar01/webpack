import { FastifyRequest, FastifyReply } from "fastify";
import { Todo } from "../models/todo.model";
import { CreateTodoRequest, UpdateTodoRequest, TodoParams } from "../types/todo.types";

export const getTodos = async (req: FastifyRequest, reply: FastifyReply) => {
  const todos = await Todo.find();
  return reply.send(todos);
};

export const createTodo = async (req: FastifyRequest<{ Body: CreateTodoRequest }>, reply: FastifyReply) => {
  const { title, completed } = req.body;
  const todo = new Todo({ title, completed });
  await todo.save();
  return reply.code(201).send(todo);
};

export const updateTodo = async (req: FastifyRequest<{ Params: TodoParams; Body: UpdateTodoRequest }>, reply: FastifyReply) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
  return reply.send(todo);
};

export const deleteTodo = async (req: FastifyRequest<{ Params: TodoParams }>, reply: FastifyReply) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  return reply.send({ message: "Todo deleted" });
};
