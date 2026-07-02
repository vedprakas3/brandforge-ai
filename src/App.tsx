import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import LandingPage from '@/pages/LandingPage'
import DashboardPage from '@/pages/DashboardPage'
import GeneratorPage from '@/pages/GeneratorPage'
import PreviewPage from '@/pages/PreviewPage'
import DownloadsPage from '@/pages/DownloadsPage'
import DocumentationPage from '@/pages/DocumentationPage'
import SettingsPage from '@/pages/SettingsPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  )
}

export default App
