export interface LoginData {
    email: string;
    password: string;
}

export interface LoginError {
    email: boolean;
    password: boolean;  
}

export interface LoginResponse {
    token: string;
}