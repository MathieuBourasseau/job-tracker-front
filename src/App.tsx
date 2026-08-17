import { Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ApplicationsPage from './pages/ApplicationsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/candidatures" element={<ApplicationsPage />} />
    </Routes>
  )
}

export default App
