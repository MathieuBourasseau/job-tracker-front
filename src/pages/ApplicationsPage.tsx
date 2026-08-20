import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { getApplications } from "../api/application";
import type { Application } from "../types/application";

import { IoBusinessOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md"
import { FaBriefcase } from "react-icons/fa"

import { Link } from "react-router";
import { getStatusDisplay } from "../utils/statusDisplay";

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

            // Get color, label, and icon representing this application's status
            const { color, label, textColor, iconColor, StatusIcon } = getStatusDisplay(application);

            return (
                <Link
                    key={application.id}
                    to={`/candidatures/${application.id}`}
                >
                    <article
                        className={`py-2 px-4 text-sm cursor-pointer flex flex-col gap-4 md:text-base ${color} ${textColor}`}
                    >
                        <div className="flex items-center gap-4">
                            <IoBusinessOutline className={`text-xl ${iconColor}`} />
                            <h2 className="text-xl">{application.companyName}</h2>
                        </div>
                        <div className="flex flex-col gap-2 py-2">
                            <div className="flex items-center gap-4">
                                <MdLocationOn className={`text-xl ${iconColor}`} />
                                <p>{application.location}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <FaBriefcase className={`text-xl ${iconColor}`} />
                                <p>{application.jobTitle}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <StatusIcon className={`text-xl ${iconColor}`} />
                                <p>{label}</p>
                            </div>
                        </div>
                    </article>
                </Link>
            )
        });
    } else {
        content = "Il n'y a actuellement aucune candidature effectuée."
    }

    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-center text-2xl md:text-4xl lg:text-5xl">Mes candidatures</h1>
            <div className="flex flex-col">
                {content}
            </div>
        </section>
    )
}
