// Login form type
export type LoginFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
}

// Register form type
export type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
    acceptPolicy: boolean;
}