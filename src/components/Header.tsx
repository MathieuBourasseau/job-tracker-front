import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Header() {

    // Extract token, email and logout from context
    const { token, email, logout } = useAuth();

    return (
        <header className="border-b border-gray-200">
            <div className="flex justify-between items-center gap-4 px-4 py-4">
                <Link to={token ? "/candidatures" : "/login"} className="font-semibold whitespace-nowrap">
                    Job Tracker
                </Link>

                {token && (
                    <div className="flex items-center gap-4 text-sm">
                        <p className="hidden md:block text-gray-500">{email}</p>
                        <button
                            onClick={() => logout()}
                            className="whitespace-nowrap border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                        >
                            Se déconnecter
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}
