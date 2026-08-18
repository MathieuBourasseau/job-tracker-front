import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"

export default function ApplicationsPage() {

    // Extract token from context
    const { token } = useAuth();

    // States
    const [applicationList, setApplicationList] = useState();
    const [errorMessage, setErrorMessage] = useState<string>("");

    // API URL
    const API_URL = import.meta.env.VITE_API_URL;

    // Load applications lists once when the page is shown
    useEffect(() => {

        // Function to get application from back end
        async function fetchApplications(){

            try {

                // Send request to back end to get application list
                const response = await fetch(`${API_URL}/api/applications`, {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` 
                    },
                });

                const data = await response.json();

                // Condition to see what to do with response
                if (response.ok) {
                    // Upload application list
                    setApplicationList(data)
                } else {
                    setErrorMessage(data);
                }
                
            } catch (error) {
                console.error(error)
                setErrorMessage("Impossible de joindre le serveur")
            }
        }

        fetchApplications();

    },[])


    return (
        <div>
            <h1>Mes candidatures</h1>
        </div>
    )
}
