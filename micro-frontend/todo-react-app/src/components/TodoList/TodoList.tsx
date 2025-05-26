import { useState } from 'react';
import './TodoList.css';
import { Todo as TodoType } from '../../services/TodoService';

interface ScheduleItemProps {
    time?: string;
    title: string;
    description?: string;
    avatarUrls?: string[];
    isLoading?: boolean;
    stepNumber?: number;
    completed?: boolean;
    onToggle?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    _id?: string;
}

const Stepper = ({ stepNumber }: { stepNumber: number }) => {
    return (
        <div className="stepper">
            <div className="step-circle">{stepNumber}</div>
        </div>
    );
};

const ScheduleItem = ({
    time,
    title,
    description,
    completed,
    stepNumber,
    onToggle,
    onEdit,
    onDelete,
}: ScheduleItemProps) => {
    return (
        <div className="schedule-item">
            <Stepper stepNumber={stepNumber as number} />
            <div className="schedule-line"></div>
            <div className="schedule-content">
                {time && <div className="time">{time}</div>}
                <div className="title">{title}</div>
                {description && <div className="description">{description}</div>}
                <div className="flex gap-2 items-center">
                    <label className="inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={completed} 
                            className="sr-only peer" 
                            onChange={onToggle} 
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <button
                        onClick={onEdit}
                        className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-red-500 hover:text-red-600 text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScheduleItem;