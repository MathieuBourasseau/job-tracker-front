import { Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ProtectedRoute from "./components/ProtectedRoute"
import ApplicationDetails from "./pages/ApplicationDetails"
import ApplicationCreate from "./pages/ApplicationCreate"
import ApplicationEdit from "./pages/ApplicationEdit"
import RootRedirect from "./components/RootRedirect"
import Footer from "./components/Footer"
import Header from "./components/Header"

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col">
                <Routes>
                    <Route path="/" element={<RootRedirect />} />
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
                    <Route
                        path="/candidatures/:id/modifier"
                        element={
                            <ProtectedRoute>
                                <ApplicationEdit />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
