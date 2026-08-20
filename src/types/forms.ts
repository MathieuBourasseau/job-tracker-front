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

// Create application form type
export type NewApplicationFormData = {
    link: string;
    contact: string;
    jobTitle: string;
    location: string;
    salary: number;
    contract: string;
    applicationDate: string;
    companyName: string;
    companyActivity: string;
}