import React, { useState } from "react"
import { useNavigate } from "react-router"
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

            // Try / catch error
            try {

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
                            <input 
                                type="checkbox"
                                onChange={handleRememberMe} 
                                checked={formData.rememberMe ?? false}
                                name="rememberMe"
                                id="rememberMe"
                            />
                            <label htmlFor="rememberMe">Rester connecté</label>
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
