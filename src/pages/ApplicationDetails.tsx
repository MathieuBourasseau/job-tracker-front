import { useEffect, useState } from "react";
import { useParams } from "react-router"
import type { Application } from "../types/application";
import { useAuth } from "../hooks/useAuth";
import { getApplicationsById } from "../api/application";

import { IoBusinessOutline } from "react-icons/io5";
import {
    MdLocationOn,
    MdOutlineSchedule,
    MdAutorenew,
    MdNotificationsActive,
    MdCancel,
    MdCategory,
    MdDescription,
    MdAttachMoney,
    MdCalendarToday,
    MdLink,
    MdPerson,
    MdCheckCircle,
    MdHighlightOff,
    MdComment,
} from "react-icons/md"
import { FaBriefcase } from "react-icons/fa"

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
                if (result.ok) {
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

    // Condition to display content
    let content;

    if (errorMessage) {
        content = errorMessage;
    } else if (isLoading) {
        content = "Chargement de la candidature en cours"
    } else if (application) {

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

            if (latest.date > current.date) {
                return latest;
            } else {
                return current;
            }
        }, application.statuses[0]);

        // Determine color of each application according to its current state
        if (latestStatus.state === "EN_COURS" && application.aRelancer) {
            color = "bg-status-follow-up";
            label = "A relancer"
            textColor = "text-white"
            iconColor = "text-white"
            StatusIcon = MdNotificationsActive

        } else if (latestStatus.state === "A_FAIRE") {
            color = "bg-status-todo";
            label = "A faire"
            textColor = "text-emerald-700"
            iconColor = "text-emerald-500"
            StatusIcon = MdOutlineSchedule

        } else if (latestStatus.state === "EN_COURS" && !application.aRelancer) {
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

        content = (
            <article
                className={`py-2 px-4 text-sm flex flex-col gap-4 md:text-base ${color} ${textColor}`}
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
                    <div className="flex items-center gap-4">
                        <MdCategory className={`text-xl ${iconColor}`} />
                        <p>{application.companyActivity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdDescription className={`text-xl ${iconColor}`} />
                        <p>{application.contract}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdAttachMoney className={`text-xl ${iconColor}`} />
                        <p>{application.salary}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdCalendarToday className={`text-xl ${iconColor}`} />
                        <p>{application.applicationDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdPerson className={`text-xl ${iconColor}`} />
                        <p>{application.contact}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdLink className={`text-xl ${iconColor}`} />
                        <a href={application.link} target="_blank" rel="noreferrer" className="underline">
                            {application.link}
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        {application.interview ? (
                            <MdCheckCircle className={`text-xl ${iconColor}`} />
                        ) : (
                            <MdHighlightOff className={`text-xl ${iconColor}`} />
                        )}
                        <p>{application.interview ? "Entretien obtenu" : "Pas d'entretien"}</p>
                    </div>
                    {application.refusalReason && (
                        <div className="flex items-center gap-4">
                            <MdComment className={`text-xl ${iconColor}`} />
                            <p>{application.refusalReason}</p>
                        </div>
                    )}
                    {application.applicationReSubmissionDate && (
                        <div className="flex items-center gap-4">
                            <MdOutlineSchedule className={`text-xl ${iconColor}`} />
                            <p>Relance du {application.applicationReSubmissionDate}</p>
                        </div>
                    )}
                    {application.applicationReSubmissionDate2 && (
                        <div className="flex items-center gap-4">
                            <MdOutlineSchedule className={`text-xl ${iconColor}`} />
                            <p>Relance du {application.applicationReSubmissionDate2}</p>
                        </div>
                    )}
                </div>
            </article>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}

