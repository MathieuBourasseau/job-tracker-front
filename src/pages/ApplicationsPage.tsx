import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { getApplications } from "../api/application";
import type { Application } from "../types/application";



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

                // Ask the API layer for the application list
                const result = await getApplications(token!);

                // Condition to see what to do with the result
                if (result.ok) {
                    // Upload application list
                    setApplicationList(result.data)
                } else {
                    setErrorMessage(result.error);
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

        content = applicationList.map((application) => {

            // Color value will change according to the status and conditions
            let color;

            // Get the latest status from each application
            const latestStatus = application.statuses.reduce((latest, current) => {

                if(latest.date > current.date){
                    return latest;
                } else {
                    return current;
                }
            }, application.statuses[0]);

            // Determine color of each application according to its current state
            if(latestStatus.state === "EN_COURS" && application.aRelancer){
                color = "bg-orange-300";

            } else if(latestStatus.state === "A_FAIRE"){
                color = "bg-white";

            } else if(latestStatus.state === "EN_COURS" && !application.aRelancer){
                color = "bg-yellow-300";

            } else {
                color = "bg-red-500";
            }

            return (
                <article 
                    key={application.id}
                    className={color}
                >
                    <p>{application.companyActivity}</p>
                </article>
            )
        });
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
