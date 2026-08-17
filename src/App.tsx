import { Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage'
import ApplicationsPage from './pages/ApplicationsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/candidatures" element={<ApplicationsPage />} />
    </Routes>
  )
}

export default App
