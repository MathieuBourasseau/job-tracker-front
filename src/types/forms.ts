import type { StatusState } from "./application";

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

// Update application form type
export type UpdateApplicationFormData = {
    link: string;
    contact: string;
    jobTitle: string;
    location: string;
    salary: number;
    contract: string;
    applicationDate: string;
    companyName: string;
    companyActivity: string;
    applicationReSubmissionDate: string;
    applicationReSubmissionDate2: string;
    interview: boolean;
    refusalReason: string;
}

// New status type
export type NewStatusFormData = {
    state: StatusState;
    applicationId: number;
}
