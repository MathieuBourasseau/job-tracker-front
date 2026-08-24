import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import { registerUser } from "../api/auth";
import type { RegisterFormData } from "../types/forms";


export default function RegisterPage() {

    const navigate = useNavigate();

    // Create form data
    const [formData, setFormData] = useState<RegisterFormData>({
        email: "",
        password: "",
        confirmPassword: "",
        acceptPolicy: false,
    });

    // Success and error messages
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // State to inform user his registration request is in progress
    const [isRegistering, setIsRegistering] = useState<boolean>(false);


    // --- handleChange ---

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }

    // --- handleAcceptPolicy ---

        const handleAcceptPolicy = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
        }

    // --- handleSubmit ---

        const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {

            // Prevent the form's default behavior
            e.preventDefault();

            // Check that both password fields match before contacting the backend
            if (formData.password !== formData.confirmPassword) {
                setErrorMessage("Les mots de passe ne correspondent pas.");
                return;
            }

            try {

                setIsRegistering(true);

                // Ask the API layer to register the user, sending only the fields it expects
                const result = await registerUser(formData.email, formData.password);

                // Condition to see what to do with the result
                if (result.ok) {
                    // Display success message
                    setSuccessMessage("Compte créé avec succès !");

                    // Hide success message after a few seconds and redirect towards login
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate("/login");
                    }, 3000);
                } else {
                    setErrorMessage(result.error);
                }

            // If the server has a problem an error is displayed
            } catch (error) {

                console.error(error);
                setErrorMessage("Impossible de joindre le serveur.");

            // In any success or error cases, registering state is getting back to false value
            } finally {
                setIsRegistering(false);
            }
        }

    // Condition to display content
    let content;

    if (isRegistering) {
        content = "Création du compte en cours";
    } else if (successMessage) {
        content = successMessage;
    } else {
        content = (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-4">
                    <legend className="sr-only">Créer un compte candidat</legend>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            onChange={handleChange}
                            name="email"
                            id="email"
                            value={formData.email ?? ""}
                            placeholder="mon@email.com"
                            className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            id="password"
                            value={formData.password ?? ""}
                            placeholder="password123"
                            className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword ?? ""}
                            placeholder="password123"
                            className="border-2 border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            onChange={handleAcceptPolicy}
                            checked={formData.acceptPolicy ?? false}
                            name="acceptPolicy"
                            id="acceptPolicy"
                        />
                        <label htmlFor="acceptPolicy">J'accepte la politique de confidentialité</label>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white rounded-lg px-3 py-2 hover:bg-green-700 font-semibold cursor-pointer"
                    >
                        S'inscrire
                    </button>

                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                </fieldset>
            </form>
        )
    }

    return (
        <section className="max-w-md mx-auto flex flex-col gap-6 px-4 py-4 md:py-6 mt-12">
            <h1 className="text-left md:text-center text-2xl md:text-4xl lg:text-5xl py-2 md:py-4">Créer un compte</h1>
            {content}
            <p className="text-sm">
                Déjà un compte ? <Link to="/login" className="underline font-semibold">Se connecter</Link>
            </p>
        </section>
    )
}
