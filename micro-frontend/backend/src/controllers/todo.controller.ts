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

      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();

      const startOfDay = new Date(year, month, day, 0, 0, 0);
      const endOfDay = new Date(year, month, day, 23, 59, 59, 999);

      filter.date = { 
        $gte: startOfDay,
        $lte: endOfDay 
      };
    }

    const todos = await Todo.find(filter).sort({ date: 1, createdAt: 1 });
    return reply.send(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return reply.code(500).send({ message: "Internal server error", error })
  }
};

export const getTodoById = async (req: FastifyRequest<{ Params: TodoParams}>, reply: FastifyReply) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if(!todo) {
      return reply.code(404).send({ message: "Todo not found" });
    }
    return reply.send(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return reply.code(500).send({ message: "Internal server error", error });
  }
}

export const createTodo = async (req: FastifyRequest<{ Body: CreateTodoRequest }>, reply: FastifyReply) => {
  try {
    const { title, completed = false, profile_id, date } = req.body;
    
    if(!profile_id) {
      return reply.code(400).send({ message: "Profile ID is required" });
    }

    if(!title || title.trim().length === 0) {
      return reply.code(400).send({ message: "Title is required" });
    }

    let todoDate = new Date();
    if(date) {
      todoDate = new Date(date);
      if(isNaN(todoDate.getTime())) {
        return reply.code(400).send({ message: "Invalid date format" });
      }
      const year = todoDate.getFullYear();
      const month = todoDate.getMonth();
      const day = todoDate.getDate();
      todoDate = new Date(year, month, day, 0, 0, 0);
    }

    const todo = new Todo({ 
      title: title.trim(), 
      completed, 
      profile_id,
      date: todoDate
    });

    await todo.save();
    return reply.code(201).send(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return reply.code(500).send({ message: "Internal server error", error });
  }
};

export const updateTodo = async (req: FastifyRequest<{ Params: TodoParams; Body: UpdateTodoRequest }>, reply: FastifyReply) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if(updates.title !== undefined && updates.title.trim().length === 0) {
      return reply.code(400).send({ message: "Title cannot be empty" });
    }

    if(updates.title) {
      updates.title = updates.title.trim();
    }

    if(updates.date) {
      const dateObj = new Date(updates.date);
      if(isNaN(dateObj.getTime())) {
        return reply.code(400).send({ message: "Invalid date format" });
      }
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();
      updates.date = new Date(year, month, day, 0, 0, 0);
    }

    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if(!todo) {
      return reply.code(404).send({ message: "Todo not found" });
    }

    return reply.send(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return reply.code(500).send({ message: "Internal server error", error });
  }
};

export const deleteTodo = async (req: FastifyRequest<{ Params: TodoParams }>, reply: FastifyReply) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    
    if(!todo) {
      return reply.code(404).send({ message: "Todo not found" });
    }

    return reply.send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return reply.code(500).send({ message: "Internal server error", error });
  }
};
