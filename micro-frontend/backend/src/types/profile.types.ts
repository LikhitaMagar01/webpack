export interface CreateProfileRequest {
    name: string;
    email: string;
    password: string;
}

export interface UpdateProfileRequest {
    name?: string;
    email?: string;
}

export interface ProfileParams {
    id: string;
}
