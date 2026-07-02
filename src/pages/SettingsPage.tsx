import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Check, Key, Cloud, AlertCircle } from 'lucide-react'
import GlassCard from '@/components/GlassCard'

const SettingsPage = () => {
  const [cloudName, setCloudName] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [uploadPreset, setUploadPreset] = useState('brandforge_unsigned')
  const [geminiKey, setGeminiKey] = useState('')
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('cloudinary')

  useEffect(() => {
    setCloudName(localStorage.getItem('cloudinary_cloud_name') || '')
    setApiKey(localStorage.getItem('cloudinary_api_key') || '')
    setApiSecret(localStorage.getItem('cloudinary_api_secret') || '')
    setUploadPreset(localStorage.getItem('cloudinary_upload_preset') || 'brandforge_unsigned')
    setGeminiKey(localStorage.getItem('gemini_api_key') || '')
  }, [])

  const handleSave = () => {
    localStorage.setItem('cloudinary_cloud_name', cloudName)
    localStorage.setItem('cloudinary_api_key', apiKey)
    localStorage.setItem('cloudinary_api_secret', apiSecret)
    localStorage.setItem('cloudinary_upload_preset', uploadPreset)
    localStorage.setItem('gemini_api_key', geminiKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'cloudinary', label: 'Cloudinary', icon: Cloud },
    { id: 'gemini', label: 'Gemini AI', icon: Key },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your API keys to enable image uploads and AI features.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cloudinary Settings */}
        {activeTab === 'cloudinary' && (
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Cloudinary Configuration</h2>
                <p className="text-sm text-muted-foreground">
                  Required for image uploads and transformations
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Cloud Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                  placeholder="your-cloud-name"
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Found in your Cloudinary dashboard URL
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Preset
                </label>
                <input
                  type="text"
                  value={uploadPreset}
                  onChange={(e) => setUploadPreset(e.target.value)}
                  placeholder="brandforge_unsigned"
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Create an unsigned upload preset in Cloudinary settings
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-300 mb-1">How to get your Cloud Name:</p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Go to <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">cloudinary.com</a> and sign up/log in</li>
                      <li>Your cloud name is shown on your dashboard</li>
                      <li>Go to Settings → Upload → Add upload preset</li>
                      <li>Set signing mode to &quot;Unsigned&quot; and save</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Gemini Settings */}
        {activeTab === 'gemini' && (
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Gemini AI Configuration</h2>
                <p className="text-sm text-muted-foreground">
                  Required for AI-powered features (captions, SEO, color extraction)
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gemini API Key <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Get your free API key from Google AI Studio
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-purple-300 mb-1">How to get your Gemini API Key:</p>
                    <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                      <li>Go to <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">aistudio.google.com</a></li>
                      <li>Sign in with your Google account</li>
                      <li>Click &quot;Get API Key&quot; in the top navigation</li>
                      <li>Create a new API key (it&apos;s free!)</li>
                      <li>Copy and paste it here</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              saved
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'btn-gradient'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved Successfully
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default SettingsPage
