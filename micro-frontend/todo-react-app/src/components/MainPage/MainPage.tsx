import * as React from 'react';
import { useEffect, useState } from "react";
// import "./MainPage.css"
import ScheduleItem from "../TodoList/TodoList";
import { TodoService, Todo as TodoType } from '../../services/TodoService';

export default function TodoList() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const [dates, setDates] = useState<{ day: string, date: string, fullDate: Date, month: string }[]>([]);
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(today);

    const getWeekDates = () => {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            currentDate.setHours(0, 0, 0, 0);
            
            dates.push({
                day: currentDate.toLocaleDateString("en-GB", { weekday: "short" }),
                date: currentDate.getDate().toString().padStart(2, '0'),
                month: currentDate.toLocaleDateString("en-GB", { month: "short" }),
                fullDate: new Date(currentDate)
            });
        }
        return dates;
    };

    useEffect(() => {
        const dates = getWeekDates();
        setDates(dates);
        const initialDate = new Date();
        initialDate.setHours(0, 0, 0, 0);
        setSelectedDate(initialDate);
    }, []);

    useEffect(() => {
        if (selectedDate) {
            fetchTodos();
        }
    }, [selectedDate]);

    const fetchTodos = async () => {
        try {
            const dateToFetch = new Date(selectedDate);
            dateToFetch.setHours(0, 0, 0, 0);
            console.log('Fetching todos for date:', dateToFetch.toISOString().split('T')[0]);
            const fetchedTodos = await TodoService.getAllTodos(dateToFetch);
            setTodos(fetchedTodos);
        } catch (error) {
            if ((error as any)?.response?.status === 404) {
                setTodos([]);
            } else {
                console.error('Error fetching todos:', error);
            }
        }
    };

    const handleCreateTodo = async () => {
        if (!newTodoTitle.trim()) return;
        
        try {
            const newTodo = await TodoService.createTodo({
                title: newTodoTitle.trim(),
                profile_id: '67d8de3b8dee8c582a5a3099',
                date: selectedDate.toISOString().split('T')[0]
            });
            setTodos([...todos, newTodo]);
            setNewTodoTitle('');
            setIsCreateModalOpen(false);
            fetchTodos();
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

    const handleEditTodo = async (todo: TodoType) => {
        if (!todo.title.trim()) return;

        try {
            const updatedTodo = await TodoService.updateTodo(todo._id, {
                title: todo.title.trim(),
                date: selectedDate.toISOString().split('T')[0]
            });
            setTodos(todos.map(t => t._id === todo._id ? updatedTodo : t));
            setEditingTodo(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleDateClick = (date: Date) => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        console.log('Selected date:', newDate.toISOString().split('T')[0]);
        setSelectedDate(newDate);
    };

    const isSelectedDate = (date: Date) => {
        const d1 = new Date(date);
        const d2 = new Date(selectedDate);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        return d1.getTime() === d2.getTime();
    };

    const isToday = (date: Date) => {
        const today = new Date();
        const d = new Date(date);
        today.setHours(0, 0, 0, 0);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === today.getTime();
    };

    return (
        <>
            <div className="py-16 sm:w-96 lg:w-96 m-auto px-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-0.5">
                        <div className="text-gray-500">
                            {selectedDate.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">
                                {isToday(selectedDate) ? 'Today' : 'Tasks'}
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
                            >
                                Add Todo
                            </button>
                    </div>
                    </div>

                    <div className="flex gap-2 sm:w-64 md:w-96 lg:w-96 overflow-x-auto no-scrollbar">
                        {dates.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleDateClick(item.fullDate)}
                                className={`cursor-pointer p-2 rounded-lg transition-colors min-w-[4rem] text-center ${
                                    isSelectedDate(item.fullDate)
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <div className={isSelectedDate(item.fullDate) ? 'text-white' : 'text-gray-500'}>
                                        {item.day}
                                    </div>
                                    <div className="font-semibold">
                                        {item.date}
                                    </div>
                                <div className={`text-xs ${isSelectedDate(item.fullDate) ? 'text-white' : 'text-gray-400'}`}>
                                    {item.month}
                                </div>
                                {isToday(item.fullDate) && !isSelectedDate(item.fullDate) && (
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mx-auto mt-1"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Todo List */}
                    {todos.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            No todos for this date
                        </div>
                    ) : (
                        todos.map((todo, index) => (
                    <ScheduleItem
                                key={todo._id}
                                stepNumber={index + 1}
                                title={todo.title}
                                completed={todo.completed}
                                onToggle={() => handleUpdateTodo(todo)}
                                onEdit={() => setEditingTodo(todo)}
                                onDelete={() => handleDeleteTodo(todo._id)}
                            />
                        ))
                    )}

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

                    {/* Edit Todo Modal */}
                    {editingTodo && (
                        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg w-96">
                                <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
                                <input
                                    type="text"
                                    value={editingTodo.title}
                                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                    placeholder="Enter todo title"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setEditingTodo(null)}
                                        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleEditTodo(editingTodo)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
