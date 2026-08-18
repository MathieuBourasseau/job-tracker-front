import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import type { Application } from "../types/application";

// API URL
const API_URL = import.meta.env.VITE_API_URL;

export default function ApplicationsPage() {

    // Extract token from context
    const { token } = useAuth();

    // States
    const [applicationList, setApplicationList] = useState<Application[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    // Load applications lists once when the page is shown
    useEffect(() => {

        // Function to get application from back end
        async function fetchApplications(){

            try {

                setIsLoading(true)

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
            
            // If the server has problem a message is shown
            } catch (error) {

                console.error(error)
                setErrorMessage("Impossible de joindre le serveur")
            
            // In any success or error cases, loading state is getting back to false value
            } finally {
                setIsLoading(false)
            }
        }

        // Call the function
        fetchApplications();
    },[token])

    // Condition to display content 
    let content;

    if(errorMessage){
        content = errorMessage
    } else if (isLoading){
        content = "Chargement des candidatures en cours"
    } else if (applicationList.length > 0) {
        content = applicationList.map((application) => (
            <article key={application.id}>
                <p>{application.companyActivity}</p>
            </article>
        ));
    } else {
        content = "Il n'y a actuellement aucune candidature effectuée."
    }

    return (
        <div>
            <h1>Mes candidatures</h1>
            <div>
                {content}
            </div>
        </div>
    )
}
