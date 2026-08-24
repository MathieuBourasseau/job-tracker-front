import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/auth";
import type { LoginFormData } from "../types/forms";


export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    // Create form data
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false,
    });

    // Success and error messages
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // State to inform user his login request is in progress
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    
    // --- handleChange ---

        // Get the changed field's name and new value from the event
        // Update the form state (object { login, password }) by replacing only this field's value, without touching the others

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name]: e.target.value});
        }

    // --- handleRememberMeCheck --- 

        // According to the case checked or not the token duration will change

        const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({ ...formData, [e.target.name] : e.target.checked })
        }

    // --- handleSubmit ---

        const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
            
            // Prevent the form's default behavior
            e.preventDefault();

            try {

                setIsLoggingIn(true);

                // Ask the API layer to log the user in
                const result = await loginUser(formData.email, formData.password);

                // Condition to see what to do with the result
                if(result.ok){
                    // Display success message
                    setSuccessMessage("Connexion réussie !");

                    // Store the session in AuthContext, which picks the right storage
                    login(result.data.token, result.data.email, result.data.id, formData.rememberMe);

                    // Hide success message after a few seconds and redirect towards user's applications
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate("/candidatures");
                    }, 3000);
                } else {
                    setErrorMessage(result.error);
                }

            // If the server has a problem an error is displayed
            } catch (error) {

                console.error(error);
                setErrorMessage("Impossible de joindre le serveur.");

            // In any success or error cases, logging in state is getting back to false value
            } finally {
                setIsLoggingIn(false);
            }
        }

    // Condition to display content
    let content;

    if (isLoggingIn) {
        content = "Connexion en cours";
    } else if (successMessage) {
        content = successMessage;
    } else {
        content = (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset className="flex flex-col gap-4">
                    <legend className="sr-only">Connexion à l'espace candidat</legend>

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

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            onChange={handleRememberMe}
                            checked={formData.rememberMe ?? false}
                            name="rememberMe"
                            id="rememberMe"
                        />
                        <label htmlFor="rememberMe">Rester connecté</label>
                    </div>

                    <button
                        type="submit"
                        className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                    >
                        Se connecter
                    </button>

                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                </fieldset>
            </form>
        )
    }

    return (
        <section className="max-w-md mx-auto flex flex-col gap-6 px-4 py-4 md:py-6 mt-12">
            <h1 className="text-2xl md:text-4xl lg:text-5xl py-2 md:py-4">Connexion</h1>
            {content}
            <p className="text-sm">
                Pas encore de compte ? <Link to="/register" className="underline font-semibold">Créer un compte</Link>
            </p>
        </section>
    )
}
