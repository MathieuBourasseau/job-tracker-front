import { useState } from "react";
import { Link } from "react-router";
import { MdMenu, MdClose, MdExplore } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";

export default function Header() {

    // Extract token, email and logout from context
    const { token, email, logout } = useAuth();

    // Whether the mobile nav menu is open
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <header className="border-b border-gray-200">
            <div className="flex justify-between items-center gap-4 px-4 py-4">
                <Link to={token ? "/candidatures" : "/login"} className="flex items-center gap-2 font-semibold whitespace-nowrap">
                    <MdExplore className="text-2xl text-green-600" />
                    Job Tracker
                </Link>

                {token && (
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <Link to="/candidatures" className="hover:underline">
                            Mes candidatures
                        </Link>
                        <Link to="/candidatures/ajouter" className="hover:underline">
                            Ajouter une candidature
                        </Link>
                    </nav>
                )}

                {token && (
                    <div className="flex items-center gap-4 text-sm">
                        <p className="hidden md:block text-gray-500">{email}</p>
                        <button
                            onClick={() => logout()}
                            className="whitespace-nowrap border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold cursor-pointer"
                        >
                            Se déconnecter
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Ouvrir le menu"
                            className="md:hidden cursor-pointer text-2xl"
                        >
                            {isMenuOpen ? <MdClose /> : <MdMenu />}
                        </button>
                    </div>
                )}
            </div>

            {token && (
                <nav
                    className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                        isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="flex flex-col gap-2 px-4 pb-4 text-sm">
                        <Link
                            to="/candidatures"
                            onClick={() => setIsMenuOpen(false)}
                            className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                        >
                            Mes candidatures
                        </Link>
                        <Link
                            to="/candidatures/ajouter"
                            onClick={() => setIsMenuOpen(false)}
                            className="border-2 border-gray-200 rounded-lg px-3 py-2 hover:border-gray-500 hover:bg-gray-300 font-semibold"
                        >
                            Ajouter une candidature
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    )
}
