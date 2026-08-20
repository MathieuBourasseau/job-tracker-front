import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type { Application } from "../types/application";
import { useAuth } from "../hooks/useAuth";
import { getApplicationsById } from "../api/application";

export default function ApplicationDetails() {

    // Get id from params
    const { id } = useParams();

    // Get token from context
    const { token } = useAuth();

    // States required to handle application and loading
    const [application, setApplication] = useState<Application>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Get application selected each time the page is loaded and the id is changing
    useEffect(() => {

        // Function to get application from back-end
        async function getApplication() {

            try {

                setIsLoading(true);

                // Ask the API layer to get application selected
                const result = await getApplicationsById(token!, id!);

                // If the result.ok is true we can show the application
                // If result.ok is false, we can update state with error 
                if(result.ok){
                    setApplication(result.data)
                } else {
                    setErrorMessage(result.error)
                }
            
            // If the server has a problem an error is displayed
            } catch (error) {

                console.error(error);
                setErrorMessage("Impossible de joindre le serveur.")

            // In any success or error cases, loading state is getting back to false value
            } finally {
                setIsLoading(false);
            }
        }

        // Call the function
        getApplication();

    }, [id, token])

    return (
        <div>
            Application détaillée
        </div>
    )
}

