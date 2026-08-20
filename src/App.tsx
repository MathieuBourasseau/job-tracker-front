import { Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ProtectedRoute from "./components/ProtectedRoute"
import ApplicationDetails from "./pages/ApplicationDetails"
import ApplicationCreate from "./pages/ApplicationCreate"

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/candidatures"
                element={
                    <ProtectedRoute>
                        <ApplicationsPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/candidatures/:id"
                element={
                    <ProtectedRoute>
                        <ApplicationDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/candidatures/ajouter"
                element={
                    <ProtectedRoute>
                        <ApplicationCreate />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default App
