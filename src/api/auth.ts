// API URL
const API_URL = import.meta.env.VITE_API_URL;

// --- Function to log a user in ---
export async function loginUser(email: string, password: string) {

    // No try/catch here: a network failure should throw and let the
    // caller's own try/catch handle it, same as the application functions
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        return { ok: true as const, data };
    } else {
        return { ok: false as const, error: data };
    }
}

// --- Function to register a new user ---
export async function registerUser(email: string, password: string) {

    const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        return { ok: true as const, data };
    } else {
        return { ok: false as const, error: data };
    }
}
