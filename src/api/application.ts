// API URL
const API_URL = import.meta.env.VITE_API_URL;

// --- Function to get the list of applications ---
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

// --- Function to get an application by id --- 
export async function getApplicationsById(token: string, id: string) {

    // Ask API for the application selected
    const response = await fetch(`${API_URL}/api/applications/${id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if(response.ok){
        return { ok: true, data};
    } else {
        return { ok: false, error:data }
    }
}

// --- Function to delete an application by id --- 
export async function deleteApplicationById(token:string, id: string){

    // Ask API to find the application and delete it
    const response = await fetch(`${API_URL}/api/applications/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });

    if(response.ok){
        return {ok: true, data: "Candidature supprimée"}
    } else {
        const data = await response.json();
        return {ok: false, error:data}
    }
}