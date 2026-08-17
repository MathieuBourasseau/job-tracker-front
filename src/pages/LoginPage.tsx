import React, { useState } from "react"
import { useNavigate } from "react-router"
import type { LoginFormData } from "../types/forms";


export default function LoginPage() {

    const navigate = useNavigate();

    // Create form data
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
        rememberMe: false,
    });

    // Success and error messages
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    
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

            // Define API url 
            const API_URL = import.meta.env.VITE_API_URL;
            
            // Try / catch error
            try {

                // Send request to back end with form data values

                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                // Condition to see what to do with response

                if(response.ok){
                    // Display success message
                    setSuccessMessage("Connexion réussie !");

                    // Use local storage or session storage depending on user's choice
                    if(formData.rememberMe){
                        localStorage.setItem("token", data.token);
                    } else {
                        sessionStorage.setItem("token", data.token)
                    }

                    // Hide success message after a few seconds and redirect towards user's applications
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate("/candidatures");
                    }, 3000);
                } else {
                    setErrorMessage(data);
                }

            } catch (error) {
                console.error(error);
                setErrorMessage("Impossible de joindre le serveur.");
            }
        }

    return (
        <section>

            {/* Form part */}
            <form onSubmit={handleSubmit}>
                <fieldset>
                <legend>Connexion à l'espace candidat</legend>
                    <div>

                        {/* Email input */}
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                onChange={handleChange}
                                name="email"
                                id="email"
                                value={formData.email ?? ""}
                                placeholder="mon@email.com"
                            />
                        </div>

                        {/* Password input */}
                        <div>
                            <label htmlFor="password">Mot de passe:</label>
                            <input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                id="password"
                                value={formData.password ?? ""}
                                placeholder="password123"
                            />
                        </div>

                        {/* Remember me input */}
                        <div>
                            <label htmlFor="rememberMe">Rester connecté</label>
                            <input 
                                type="checkbox"
                                onChange={handleRememberMe} 
                                checked={formData.rememberMe ?? false}
                                name="rememberMe"
                                id="rememberMe"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit">Se connecter</button>
                    </div>
                </fieldset>                
            </form>

            {/* Sucess message */}
            {successMessage && (
                <div>
                    <p>{successMessage}</p>
                    <span>✅</span>
                </div>
            )}
            
            {/* Error message */}
            {errorMessage && (
                <div>
                    <p>{errorMessage}</p>
                    <span>❌</span>
                </div>
            )}
            
        </section>
    )
}
