import { useNavigate, useParams } from "react-router"
import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import type { UpdateApplicationFormData } from "../types/forms";
import type { Application } from "../types/application";
import { getApplicationsById, updateApplicationById } from "../api/application";

export default function ApplicationEdit() {

    // Redirect once the application is udpated
    const navigate = useNavigate();

    // Get token from context 
    const { token } = useAuth();

    // Get id from params
    const { id } = useParams();

    // Required states
    const [sucessMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUpadting, setIsUpdating] = useState<boolean>(false);

    const [formData, setFormData] = useState<UpdateApplicationFormData>({
        link: "",
        contact: "",
        jobTitle: "",
        location: "",
        salary: 0,
        contract: "",
        applicationDate: "",
        companyName: "",
        companyActivity: "",
        applicationReSubmissionDate: "",
        applicationReSubmissionDate2: "",
        interview: false,
        refusalReason: "",
    });

    // Load data form when the page is loaded
    useEffect(() => {

        // Function to get application data
        async function fetchApplicationData(){

            try {

                setIsLoading(true);

                // Ask api layer to get application data and fill the formData
                const result = await getApplicationsById(token!, id!)

                // Condition to see what to do with the result
                if (result.ok){
                    // The fetched application, typed so TypeScript checks the mapping below
                    const application: Application = result.data;

                    // Build the form data from the fetched application, replacing
                    // any null (no resubmission date/refusal reason yet) with ""
                    setFormData({
                        link: application.link,
                        contact: application.contact,
                        jobTitle: application.jobTitle,
                        location: application.location,
                        salary: application.salary,
                        contract: application.contract,
                        applicationDate: application.applicationDate,
                        companyName: application.companyName,
                        companyActivity: application.companyActivity,
                        applicationReSubmissionDate: application.applicationReSubmissionDate ?? "",
                        applicationReSubmissionDate2: application.applicationReSubmissionDate2 ?? "",
                        interview: application.interview,
                        refusalReason: application.refusalReason ?? "",
                    });
                } else {
                    setErrorMessage(result.error)
                }

            // If the server has problem a message is shown
            } catch (error) {
                
                console.error(error)
                setErrorMessage("Impossible de joindre le serveur");

            // In any success or error cases, loading state is getting back to false value
            } finally {
                setIsLoading(false)
            }
        }

        fetchApplicationData();
    }, [token, id]);

    // handleChange
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        if (e.target.name === "salary") {
            setFormData({ ...formData, [e.target.name]: Number(e.target.value) })
        } else if (e.target.name === "interview") {
            setFormData({ ...formData, [e.target.name]: e.target.value === "true"})
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // handleSubmit
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

         // Prevent the form's default behavior
        e.preventDefault();

        try {

            setIsUpdating(true);

            // Ask the api layer to update application
            const result = await updateApplicationById(token!, id!, formData);

            // Condition to see what to do with the result
            if (result.ok) {
                // Display success message
                setSuccessMessage(result.data);

                // Hide success message after a few seconds and redirect towards the
                // updated application's detail page
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate(`/candidatures/${id}`);
                }, 3000);
            } else {
                setErrorMessage(result.error);
            }

        } catch (error) {

            console.error(error);
            setErrorMessage("Impossible de joindre le serveur.");

        } finally {
            setIsUpdating(false);
        }
    }

    // Condition to display content
    let content;

    if (errorMessage) {
        content = errorMessage;
    } else if (isLoading) {
        content = "Chargement de la candidature en cours";
    } else if (isUpadting) {
        content = "Mise à jour de la candidature en cours";
    } else if (sucessMessage) {
        content = sucessMessage;
    } else {
        content = (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-4">
                    <legend className="sr-only">Modifier la candidature</legend>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="companyName">Entreprise</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="companyName"
                            id="companyName"
                            value={formData.companyName}
                            placeholder="Nom de l'entreprise"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="companyActivity">Secteur d'activité</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="companyActivity"
                            id="companyActivity"
                            value={formData.companyActivity}
                            placeholder="Tech, Finance, ..."
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="jobTitle">Intitulé du poste</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="jobTitle"
                            id="jobTitle"
                            value={formData.jobTitle}
                            placeholder="Développeur Frontend"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="location">Localisation</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="location"
                            id="location"
                            value={formData.location}
                            placeholder="Paris"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="contract">Type de contrat</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="contract"
                            id="contract"
                            value={formData.contract}
                            placeholder="CDI"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="salary">Salaire</label>
                        <input
                            type="number"
                            onChange={handleChange}
                            name="salary"
                            id="salary"
                            value={formData.salary}
                            placeholder="38000"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="applicationDate">Date de candidature</label>
                        <input
                            type="date"
                            onChange={handleChange}
                            name="applicationDate"
                            id="applicationDate"
                            value={formData.applicationDate}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="contact">Contact</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="contact"
                            id="contact"
                            value={formData.contact}
                            placeholder="rh@entreprise.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="link">Lien de l'annonce</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="link"
                            id="link"
                            value={formData.link}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="interview">Entretien obtenu</label>
                        <select
                            onChange={handleChange}
                            name="interview"
                            id="interview"
                            value={formData.interview ? "true" : "false"}
                        >
                            <option value="false">Non</option>
                            <option value="true">Oui</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="refusalReason">Motif de refus</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="refusalReason"
                            id="refusalReason"
                            value={formData.refusalReason}
                            placeholder="Poste pourvu, profil non retenu, ..."
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="applicationReSubmissionDate">1ère date de relance</label>
                        <input
                            type="date"
                            onChange={handleChange}
                            name="applicationReSubmissionDate"
                            id="applicationReSubmissionDate"
                            value={formData.applicationReSubmissionDate}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="applicationReSubmissionDate2">2ème date de relance</label>
                        <input
                            type="date"
                            onChange={handleChange}
                            name="applicationReSubmissionDate2"
                            id="applicationReSubmissionDate2"
                            value={formData.applicationReSubmissionDate2}
                        />
                    </div>

                    <button
                        type="submit"
                        className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                    >
                        Enregistrer les modifications
                    </button>
                </fieldset>
            </form>
        )
    }

    return (
        <section className="max-w-2xl mx-auto flex flex-col gap-6 px-4 py-4 md:py-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl py-2 md:py-4">Modifier ma candidature</h1>
            {content}
        </section>
    )
}
