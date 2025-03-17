
export interface CreateTodoRequest {
    title: string;
    completed: boolean;
}

export interface UpdateTodoRequest {
    title?: string;
    completed?: boolean;
}

export interface TodoParams {
    id: string;
}
