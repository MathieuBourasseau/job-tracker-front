// API URL
const API_URL = import.meta.env.VITE_API_URL;

export async function getApplications(token: string) {

    // No try/catch here: a network failure should throw and let the
    // caller's own try/catch handle it, same as before the refactor
    const response = await fetch(`${API_URL}/api/applications`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    const data = await response.json();

    if (response.ok) {
        return { ok: true, data };
    } else {
        return { ok: false, error: data };
    }
}
