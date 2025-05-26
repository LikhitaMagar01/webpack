import { useState, useEffect } from 'react';
import { TodoService, Todo as TodoType } from '../../services/TodoService';

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await TodoService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleCreateTodo = async () => {
    if (!newTodoTitle.trim()) return;
    
    try {
      const newTodo = await TodoService.createTodo({
        title: newTodoTitle,
        profile_id: '65f2f3c88a78e2b5c5c5c5c5',
        date: new Date().toISOString().split('T')[0]
      });
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (todo: TodoType) => {
    try {
      const updatedTodo = await TodoService.updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos(todos.map(t => t._id === todo._id ? updatedTodo : t));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await TodoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = async () => {
    if (!editingTodo || !editingTodo.title.trim()) return;

    try {
      const updatedTodo = await TodoService.updateTodo(editingTodo._id, {
        title: editingTodo.title,
      });
      setTodos(todos.map(t => t._id === editingTodo._id ? updatedTodo : t));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Todo
        </button>
      </div>

      {/* Create Todo Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Todo</h2>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter todo title"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTodo}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map(todo => (
          <div
            key={todo._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            {editingTodo?._id === todo._id ? (
              <input
                type="text"
                value={editingTodo.title}
                onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                className="flex-1 p-2 border rounded mr-4"
              />
            ) : (
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleUpdateTodo(todo)}
                  className="mr-4"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.title}
                </span>
              </div>
            )}
            
            <div className="flex gap-2">
              {editingTodo?._id === todo._id ? (
                <>
                  <button
                    onClick={handleEditTodo}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTodo(null)}
                    className="text-gray-500 hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditingTodo(todo)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 