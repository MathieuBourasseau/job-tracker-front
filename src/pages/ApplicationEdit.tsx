import { useNavigate, useParams } from "react-router"
import { useAuth } from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import type { UpdateApplicationFormData } from "../types/forms";
import type { Application } from "../types/application";
import { getApplicationsById } from "../api/application";

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

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
            
        } catch (error) {
            
        } finally {
            
        }
    }

    return (
        <div>
            <h1>Modification de ma candidature</h1>
        </div>
    )
}
