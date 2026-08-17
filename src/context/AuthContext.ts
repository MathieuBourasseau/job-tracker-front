import { createContext } from "react";

export type AuthContextType = {
    token: string | null;
    email: string | null;
    userId: number | null;
    login: (token: string, email: string, userId: number, rememberMe: boolean) => void;
    logout: () => void;
}

// Create Auth context
export const AuthContext = createContext<AuthContextType>({
    token: null,
    email: null,
    userId: null,
    login: () => {},
    logout: () => {}
});
