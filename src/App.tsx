import { Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ProtectedRoute from "./components/ProtectedRoute"

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
        </Routes>
    )
}

export default App
