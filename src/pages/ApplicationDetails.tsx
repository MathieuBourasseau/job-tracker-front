import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import type { Application, StatusState } from "../types/application";
import { useAuth } from "../hooks/useAuth";
import { deleteApplicationById, getApplicationsById } from "../api/application";
import { createStatus } from "../api/status";

import { IoBusinessOutline } from "react-icons/io5";
import {
    MdLocationOn,
    MdOutlineSchedule,
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
import { getStatusDisplay } from "../utils/statusDisplay";

// Turn a raw ISO date string into a readable French date
function formatDate(date: string) {
    return new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default function ApplicationDetails() {

    // Get id from params
    const { id } = useParams();

    // Get token from context
    const { token } = useAuth();

    const navigate = useNavigate();

    // States required to handle application and loading
    const [application, setApplication] = useState<Application>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

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

    // --- Function to delete application --- 
    async function handleDelete() {

        try {

            setIsDeleting(true);

            // Call the API to delete the application
            const result = await deleteApplicationById(token!, id!);

            // Display success delete message or error during deleting
            if (result.ok) {
                setSuccessMessage(result.data);
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/candidatures")
                }, 3000);
            } else {
                setErrorMessage(result.error)
            }

        // If the server has a problem an error is displayed
        } catch (error) {

            console.error(error);
            setErrorMessage("Impossible de joindre le serveur.");

        // In any success or error cases, deleting state is getting back to false value
        } finally {
            setIsDeleting(false);
        }
    }

    // --- Function to change the application's status ---
    async function handleStatusChange(state: StatusState) {

        try {

            setIsChangingStatus(true);

            // Ask the API to add a new status to this application
            const result = await createStatus(token!, { state, applicationId: Number(id) });

            // On success, replace application with the fresh version the backend returns
            // (it already contains the new status and the recalculated aRelancer)
            if (result.ok) {
                setApplication(result.data);
            } else {
                setErrorMessage(result.error);
            }

        // If the server has a problem an error is displayed
        } catch (error) {

            console.error(error);
            setErrorMessage("Impossible de joindre le serveur.");

        // In any success or error cases, changing status state is getting back to false value
        } finally {
            setIsChangingStatus(false);
        }
    }

    // Condition to display content
    let content;

    if (errorMessage) {
        content = errorMessage;
    } else if (isLoading) {
        content = "Chargement de la candidature en cours"
    } else if(isDeleting){
        content = "Suppression en cours"
    } else if(isChangingStatus){
        content = "Mise à jour du statut en cours"
    } else if(successMessage){
        content = successMessage;
    } else if (application) {

        // Get color, label, and icon representing this application's status
        const { color, label, textColor, iconColor, StatusIcon } = getStatusDisplay(application);

        content = (
            <div className="flex flex-col gap-6">

                {/* Header: identity + status, the only colored block */}
                <div className={`p-4 rounded flex flex-col gap-2 ${color} ${textColor}`}>
                    <div className="flex items-center gap-4">
                        <IoBusinessOutline className={`text-xl ${iconColor}`} />
                        <h2 className="text-xl font-semibold">{application.companyName}</h2>
                    </div>
                    <p className="pl-9">{application.jobTitle}</p>
                    <div className="flex items-center gap-4 pl-0">
                        <StatusIcon className={`text-xl ${iconColor}`} />
                        <p>{label}</p>
                    </div>
                </div>

                {/* Section: informations */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Informations
                    </h3>
                    <div className="flex items-center gap-4">
                        <MdLocationOn className="text-xl" />
                        <p>{application.location}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdDescription className="text-xl" />
                        <p>{application.contract}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdAttachMoney className="text-xl" />
                        <p>{application.salary.toLocaleString("fr-FR")} €</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdCategory className="text-xl" />
                        <p>{application.companyActivity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdCalendarToday className="text-xl" />
                        <p>Candidature envoyée le {formatDate(application.applicationDate)}</p>
                    </div>
                </div>

                {/* Section: contact */}
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Contact
                    </h3>
                    <div className="flex items-center gap-4">
                        <MdPerson className="text-xl" />
                        <p>{application.contact}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <MdLink className="text-xl" />
                        <a href={application.link} target="_blank" rel="noreferrer" className="underline">
                            Voir l'annonce
                        </a>
                    </div>
                </div>

                {/* Section: suivi */}
                <div className="flex flex-col gap-3 border-t border-gray-200 pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Suivi
                    </h3>
                    <div className="flex items-center gap-4">
                        {application.interview ? (
                            <MdCheckCircle className="text-xl" />
                        ) : (
                            <MdHighlightOff className="text-xl" />
                        )}
                        <p>{application.interview ? "Entretien obtenu" : "Pas d'entretien"}</p>
                    </div>
                    {application.refusalReason && (
                        <div className="flex items-center gap-4">
                            <MdComment className="text-xl" />
                            <p>{application.refusalReason}</p>
                        </div>
                    )}
                    {application.applicationReSubmissionDate && (
                        <div className="flex items-center gap-4">
                            <MdOutlineSchedule className="text-xl" />
                            <p>Relance du {formatDate(application.applicationReSubmissionDate)}</p>
                        </div>
                    )}
                    {application.applicationReSubmissionDate2 && (
                        <div className="flex items-center gap-4">
                            <MdOutlineSchedule className="text-xl" />
                            <p>Relance du {formatDate(application.applicationReSubmissionDate2)}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // The most recent status, used to disable the button matching the current state
    const latestStatus = application?.statuses.reduce((latest, current) =>
        current.date > latest.date ? current : latest
    ).state;

    return (
        <section className="max-w-2xl mx-auto flex flex-col gap-6 px-4 py-4 md:py-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl py-2 md:py-4">Ma candidature</h1>

            {/* Application choices */}

            <div className="flex flex-col items-start gap-2 text-sm md:flex-row md:flex-wrap">
                <Link to={`/candidatures/${id}/modifier`} className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                >
                    <p>Modifier ma candidature</p>
                </Link>

                <Link
                    to="/candidatures"
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                >
                    <p>Revenir à mes candidatures</p>
                </Link>
                <button
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                    onClick={() => handleDelete()}
                >
                    <p>Supprimer ma candidature</p>
                </button>
                <button
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
                    onClick={() => handleStatusChange("EN_COURS")}
                    disabled={!application || isChangingStatus || latestStatus === "EN_COURS"}
                >
                    <p>Passer en cours</p>
                </button>
                <button
                    className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
                    onClick={() => handleStatusChange("REFUS")}
                    disabled={!application || isChangingStatus || latestStatus === "REFUS"}
                >
                    <p>Marquer refusée</p>
                </button>
            </div>

            {content}
        </section>
    )
}
