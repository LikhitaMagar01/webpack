
export interface CreateTodoRequest {
    title: string;
    completed: boolean;
    profile_id: string;
    date: Date;
}

export interface UpdateTodoRequest {
    title?: string;
    completed?: boolean;
    date?: Date;
}

export interface TodoParams {
    id: string;
}
