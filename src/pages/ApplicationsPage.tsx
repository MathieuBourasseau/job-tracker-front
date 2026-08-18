import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { getApplications } from "../api/application";
import type { Application } from "../types/application";

import { IoBusinessOutline } from "react-icons/io5";
import { MdLocationOn, MdOutlineSchedule, MdAutorenew, MdNotificationsActive, MdCancel } from "react-icons/md"
import { FaBriefcase } from "react-icons/fa"

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

            // Label value will change according to application state
            let label

            // Text color will change to stay readable against the background color
            let textColor

            // Icon color, a bit more saturated than the text color, matching the status theme
            let iconColor

            // Icon component illustrating the status, different per state
            let StatusIcon

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
                color = "bg-status-follow-up";
                label= "A relancer"
                textColor = "text-white"
                iconColor = "text-white"
                StatusIcon = MdNotificationsActive

            } else if(latestStatus.state === "A_FAIRE"){
                color = "bg-status-todo";
                label = "A faire"
                textColor = "text-emerald-700"
                iconColor = "text-emerald-500"
                StatusIcon = MdOutlineSchedule

            } else if(latestStatus.state === "EN_COURS" && !application.aRelancer){
                color = "bg-status-in-progress";
                label = "En cours"
                textColor = "text-black"
                iconColor = "text-black"
                StatusIcon = MdAutorenew

            } else {
                color = "bg-status-refused";
                label = "Refus"
                textColor = "text-white"
                iconColor = "text-white"
                StatusIcon = MdCancel
            }

            return (
                <article
                    key={application.id}
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
