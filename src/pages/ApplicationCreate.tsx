import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";
import type { NewApplicationFormData } from "../types/forms";
import { createApplication } from "../api/application";

export default function ApplicationCreate() {

    // Used to redirect once the application is created
    const navigate = useNavigate();

    // Get token to add application to user's applications
    const { token } = useAuth();

    // States required to display success or error message
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // State to informer user of his application creation
    const [isCreating, setIsCreating] = useState<boolean>(false);

    // Create form data for new application
    const [formData, setFormData] = useState<NewApplicationFormData>({
        link: "",
        contact: "",
        jobTitle: "",
        location: "",
        salary: 0,
        contract: "",
        applicationDate: "",
        companyName: "",
        companyActivity: ""
    });

    // --- handleChange ---

    // Get the changed field's name and new value from the event
    // Update the form state by replacing only this field's value, without touching the others
    // If the targeted element is salary we convert the value in number before sending it to backend

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "salary") {
            setFormData({ ...formData, [e.target.name]: Number(e.target.value) })
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    // --- handleSubmit ---

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

        // Prevent the form's default behavior
        e.preventDefault();

        // Try / catch error
        try {

            setIsCreating(true);

            // Call the layer function to create application
            const result = await createApplication(token!, formData)

            // Condition to see what to do with result
            if (result.ok) {
                // Display success message
                setSuccessMessage("Candidature ajoutée !");

                // Hide success message after a few seconds and redirect towards user's applications
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/candidatures");
                }, 3000);
            } else {
                setErrorMessage(result.error);
            }

        } catch (error) {

            console.error(error);
            setErrorMessage("Impossible de joindre le serveur.");

        } finally {
            setIsCreating(false);
        }
    }

    // Condition to display content
    let content;

    if (errorMessage) {
        content = errorMessage;
    } else if (isCreating) {
        content = "Création de la candidature en cours";
    } else if (successMessage) {
        content = successMessage;
    } else {
        content = (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-4">
                    <legend className="sr-only">Nouvelle candidature</legend>

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

                    <button
                        type="submit"
                        className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                    >
                        Ajouter la candidature
                    </button>
                </fieldset>
            </form>
        )
    }

    return (
        <section className="max-w-2xl mx-auto flex flex-col gap-6 px-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl">Ajouter une nouvelle candidature</h1>
            {content}
        </section>
    )
}
