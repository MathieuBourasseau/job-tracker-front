// Status history entry type
export type StatusState = "A_FAIRE" | "EN_COURS" | "REFUS";

export type Status = {
    id: number;
    state: StatusState;
    date: string;
}

// Application type, matching the backend's ApplicationResponseDto
export type Application = {
    id: number;
    companyId: number;
    link: string;
    contact: string;
    jobTitle: string;
    location: string;
    salary: number;
    contract: string;
    applicationDate: string;
    applicationReSubmissionDate: string | null;
    applicationReSubmissionDate2: string | null;
    interview: boolean;
    refusalReason: string | null;
    companyName: string;
    companyActivity: string;
    statuses: Status[];
    aRelancer: boolean;
}
