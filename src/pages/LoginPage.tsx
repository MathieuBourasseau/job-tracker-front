import { useState } from "react"
import type { LoginFormData } from "../types/forms";


export default function LoginPage() {

    // Create form data
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    });

    // Success and error messages
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    

    // --- handleChange ---
        // 1. Get the changed field's name and new value from the event
        // 2. Update the form state (object { login, password }) by replacing only this field's value, without touching the others

    // --- handleSubmit ---
        // 1. Prevent the form's default behavior (e.preventDefault())
        // 2. Read the current form values from the state (already kept up to date by handleChange)
        // 3. try :
        //      a. Send a request to the backend (fetch) with these values
        //      b. If the response is OK :
        //           - Get the token, email and id from the response
        //           - Store the token in localStorage
        //           - Redirect the user to the applications list
        //      c. Otherwise (response received but with an error, e.g. 401) :
        //           - Get the error message returned by the server
        //           - Display this message to the user
        //    catch (error) :
        //      - The request never reached the server (network issue)
        //      - Display a generic message ("Unable to reach the server")


    return (
        <div>

        </div>
    )
}
