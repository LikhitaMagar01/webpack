import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/todos';

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  profile_id: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoInput {
  title: string;
  profile_id: string;
  date: string;
}

// Helper function to format date to YYYY-MM-DD
const formatDate = (date: Date): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
};

export const TodoService = {
  async getAllTodos(date?: Date): Promise<Todo[]> {
    const params = new URLSearchParams();
    if (date) {
      params.append('date', formatDate(date));
    }
    console.log('API Request URL:', `${API_BASE_URL}/todo?${params.toString()}`);
    const response = await axios.get(`${API_BASE_URL}/todo?${params.toString()}`);
    return response.data;
  },

  async createTodo(todo: CreateTodoInput): Promise<Todo> {
    const response = await axios.post(`${API_BASE_URL}/create`, {
      ...todo,
      date: formatDate(new Date(todo.date))
    });
    return response.data;
  },

  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    const updates = { ...todo };
    if (updates.date) {
      updates.date = formatDate(new Date(updates.date));
    }
    const response = await axios.put(`${API_BASE_URL}/todo/update/${id}`, updates);
    return response.data;
  },

  async deleteTodo(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/todo/delete/${id}`);
  },

  async getTodoById(id: string): Promise<Todo> {
    const response = await axios.get(`${API_BASE_URL}/todo/${id}`);
    return response.data;
  }
}; 