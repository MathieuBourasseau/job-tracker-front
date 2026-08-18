import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {

    // Extract token from context
    const { token } = useAuth();

    // If token is valid we display the children, else we redirect towards login page
    if(token){
        return children
    } else {
        return <Navigate to="/login" />
    }

}
