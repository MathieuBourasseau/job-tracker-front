import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function RootRedirect() {

    // Extract token from context
    const { token } = useAuth();

    // Send logged-in users to their applications, everyone else to login
    return <Navigate to={token ? "/candidatures" : "/login"} replace />;
}
