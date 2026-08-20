import React, { useState } from "react"
import { useNavigate } from "react-router"
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

            // Try / catch error
            try {

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
                <legend>Créer un compte candidat</legend>
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

                        {/* Confirm password input */}
                        <div>
                            <label htmlFor="confirmPassword">Confirmer le mot de passe:</label>
                            <input
                                type="password"
                                onChange={handleChange}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword ?? ""}
                                placeholder="password123"
                            />
                        </div>

                        {/* Accept policy input */}
                        <div>
                            <input
                                type="checkbox"
                                onChange={handleAcceptPolicy}
                                checked={formData.acceptPolicy ?? false}
                                name="acceptPolicy"
                                id="acceptPolicy"
                            />
                            <label htmlFor="acceptPolicy">J'accepte la politique de confidentialité</label>
                        </div>
                    </div>
                    <div>
                        <button type="submit">S'inscrire</button>
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
