import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {

    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token") ?? sessionStorage.getItem("token")
    );
    const [email, setEmail] = useState<string | null>(
        () => localStorage.getItem("email") ?? sessionStorage.getItem("email")
    );
    const [userId, setUserId] = useState<number | null>(() => {
        const storedUserId = localStorage.getItem("userId") ?? sessionStorage.getItem("userId");
        return storedUserId ? Number(storedUserId) : null;
    });

    // Update state, then persist token/email/userId in the storage the user chose
    const login = (token: string, email: string, userId: number, rememberMe: boolean) => {
        setToken(token);
        setEmail(email);
        setUserId(userId);

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", token);
        storage.setItem("email", email);
        storage.setItem("userId", String(userId));
    }

    // Clear state and remove everything from both storages, since we don't know which one was used
    const logout = () => {
        setToken(null);
        setEmail(null);
        setUserId(null);

        for (const storage of [localStorage, sessionStorage]) {
            storage.removeItem("token");
            storage.removeItem("email");
            storage.removeItem("userId");
        }
    }

    return (
        <AuthContext.Provider value={{ token, email, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
