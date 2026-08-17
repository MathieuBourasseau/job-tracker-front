import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {

    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    // Update state, then persist the token in the storage the user chose
    const login = (token: string, email: string, userId: number, rememberMe: boolean) => {
        setToken(token);
        setEmail(email);
        setUserId(userId);

        if (rememberMe) {
            localStorage.setItem("token", token);
        } else {
            sessionStorage.setItem("token", token);
        }
    }

    // Clear state and remove the token from both storages, since we don't know which one was used
    const logout = () => {
        setToken(null);
        setEmail(null);
        setUserId(null);

        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ token, email, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
