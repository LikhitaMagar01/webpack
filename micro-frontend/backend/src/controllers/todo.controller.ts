import { FastifyRequest, FastifyReply } from "fastify";
import { Todo } from "../models/todo.model";
import { CreateTodoRequest, UpdateTodoRequest, TodoParams } from "../types/todo.types";

export const getTodos = async (
  req: FastifyRequest<{ Querystring: { profile_id?: string; date?: string } }>,
  reply: FastifyReply
) => {
  const { profile_id, date } = req.query;
  try {
    const filter: any = {};
    if(profile_id) {
      filter.profile_id = profile_id;
    }
    if(date) {
      const dateObj = new Date(date);
      if(isNaN(dateObj.getTime())) {
        return reply.code(400).send({ message: "Invalid date format" });
      }

      const startOfDay = new Date(dateObj);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      filter.date = { $gte: startOfDay, $lte: endOfDay };
    }
    const todos = await Todo.find(filter);
    if(!todos.length) {
      return reply.code(404).send({ message: "No todos found"})
    }
    return reply.send(todos);
  } catch (error) {
    return reply.code(500).send({ message: "Internal server error", error})
  }
};

export const getTodoById = async (req: FastifyRequest<{ Params: TodoParams}>, reply: FastifyReply) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);;
  if(!todo) {
    return reply.code(404).send({ message: "Todo is not found. "});
  }
  return reply.send(todo);
}

export const createTodo = async (req: FastifyRequest<{ Body: CreateTodoRequest }>, reply: FastifyReply) => {
  const { title, completed = false, profile_id, date } = req.body;
  if(!profile_id) {
    return reply.code(400).send({ message: "profile id is required" })
  }
  const todo = new Todo({ title, completed, profile_id, date });
  await todo.save();
  return reply.code(201).send({ message: "Todo created successfully", todo});
};

export const updateTodo = async (req: FastifyRequest<{ Params: TodoParams; Body: UpdateTodoRequest }>, reply: FastifyReply) => {
  const { id } = req.params;
  const { title, completed, date } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { title, completed, date }, { new: true });
  return reply.send(todo);
};

export const deleteTodo = async (req: FastifyRequest<{ Params: TodoParams }>, reply: FastifyReply) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  return reply.send({ message: "Todo deleted" });
};
