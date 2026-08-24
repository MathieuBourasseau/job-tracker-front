import type { NewStatusFormData } from "../types/forms";

// API URL
const API_URL = import.meta.env.VITE_API_URL;

// --- Function to create a new status ---
export async function createStatus(token: string, newStatus: NewStatusFormData) {

    // Ask API to create an application for the user
    const response = await fetch(`${API_URL}/api/statuses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newStatus),
    });

    const data = await response.json();

    if (response.ok) {
        return { ok: true as const, data };
    } else {
        return { ok: false as const, error: data };
    }
}