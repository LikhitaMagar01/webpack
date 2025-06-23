import * as React from 'react';
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete?.();
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <div className="schedule-item">
                <Stepper stepNumber={stepNumber as number} />
                <div className="schedule-line"></div>
                <div className={`schedule-content ${completed ? 'completed' : ''}`}>
                    {time && <div className="time">{time}</div>}
                    <div className="title">{title}</div>
                    {description && <div className="description">{description}</div>}
                    <div className="flex gap-2 items-center">
                        <label className="inline-flex items-center cursor-pointer toggle-container">
                            <input 
                                type="checkbox" 
                                checked={completed} 
                                className="sr-only peer" 
                                onChange={onToggle} 
                            />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 toggle-button">
                                <span className="toggle-label">
                                    {completed ? 'Complete' : 'Incomplete'}
                                </span>
                            </div>
                        </label>
                        <button
                            onClick={onEdit}
                            className="text-blue-500 hover:text-blue-600 text-sm edit-button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            className="text-red-500 hover:text-red-600 text-sm delete-button"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center modal-overlay">
                    <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 modal-content">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Todo</h3>
                                <p className="text-sm text-gray-500">This action cannot be undone</p>
                            </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to delete "<strong>{title}</strong>"? This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ScheduleItem;