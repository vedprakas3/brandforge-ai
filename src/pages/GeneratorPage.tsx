import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  X,
  Sparkles,
  Image,
  AlertCircle,
  Check,
  Loader2,
} from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import { uploadToCloudinary, generateAllAssets } from '@/lib/cloudinary'
import { analyzeImage, fileToBase64 } from '@/lib/gemini'
import type { GeneratedAsset, AIResult } from '@/types'

const GeneratorPage = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [publicId, setPublicId] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadError, setUploadError] = useState<string>('')
  const [, setGeneratedAssets] = useState<GeneratedAsset[]>([])
  const [aiResults, setAiResults] = useState<AIResult | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Check for API keys
  const hasCloudinary = !!localStorage.getItem('cloudinary_cloud_name')
  const hasGemini = !!localStorage.getItem('gemini_api_key')

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFile(droppedFile)
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFile(selectedFile)
    }
  }, [])

  const handleFile = (selectedFile: File) => {
    setUploadError('')
    setFile(selectedFile)
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      const result = await uploadToCloudinary(file)
      clearInterval(progressInterval)
      setUploadProgress(100)
      setPublicId(result.publicId)

      // Small delay to show completion
      setTimeout(() => {
        setIsUploading(false)
      }, 500)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
      setIsUploading(false)
    }
  }

  const handleGenerate = async () => {
    if (!publicId) return

    setIsGenerating(true)

    try {
      // Generate all assets
      const assets = generateAllAssets(publicId)
      setGeneratedAssets(assets)

      // Run AI analysis if Gemini key is available
      if (hasGemini && file) {
        try {
          const base64 = await fileToBase64(file)
          const mimeType = file.type
          const aiResult = await analyzeImage(base64, mimeType)
          setAiResults(aiResult)
        } catch (aiError) {
          console.error('AI analysis error:', aiError)
        }
      }

      // Save to history
      const history = JSON.parse(localStorage.getItem('brandforge_history') || '[]')
      history.unshift({
        id: `gen-${Date.now()}`,
        imageName: file?.name || 'unknown',
        previewUrl: assets[0]?.previewUrl || '',
        assetsGenerated: assets.length,
        timestamp: Date.now(),
        formats: [...new Set(assets.map((a: GeneratedAsset) => a.format))],
      })
      localStorage.setItem('brandforge_history', JSON.stringify(history.slice(0, 50)))

      // Store generated data for other pages
      localStorage.setItem('brandforge_current_assets', JSON.stringify(assets))
      if (aiResults) {
        localStorage.setItem('brandforge_current_ai', JSON.stringify(aiResults))
      }

      // Navigate to preview
      navigate('/preview')
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview('')
    setPublicId('')
    setUploadError('')
    setUploadProgress(0)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Generate Your <span className="text-gradient">Brand Kit</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload your logo, product image, or brand asset. We&apos;ll generate 15+ perfectly sized assets and AI-powered content.
          </p>
        </div>

        {/* API Key Warnings */}
        {!hasCloudinary && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-yellow-300">Cloudinary Not Configured</p>
              <p className="text-muted-foreground">
                Please{' '}
                <a href="/settings" className="text-yellow-400 hover:underline">
                  configure your Cloudinary settings
                </a>{' '}
                to upload and transform images.
              </p>
            </div>
          </motion.div>
        )}

        {!hasGemini && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-purple-300">Gemini AI Not Configured (Optional)</p>
              <p className="text-muted-foreground">
                Add your Gemini API key in{' '}
                <a href="/settings" className="text-purple-400 hover:underline">
                  settings
                </a>{' '}
                for AI captions, SEO, and color extraction. Assets will still generate without it.
              </p>
            </div>
          </motion.div>
        )}

        {/* Upload Zone */}
        <GlassCard className="mb-6">
          {!preview ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragOver
                  ? 'border-blue-400 bg-blue-500/10 scale-[1.02]'
                  : 'border-white/15 hover:border-white/25 hover:bg-white/[0.02]'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Drop your image here, or click to browse
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Supports JPG, PNG, WebP, AVIF up to 10MB
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Image className="w-4 h-4" />
                <span>Logo</span>
                <span className="text-white/20">|</span>
                <span>Product Image</span>
                <span className="text-white/20">|</span>
                <span>Brand Asset</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={clearFile}
                className="absolute top-2 right-2 z-10 w-8 h-8 rounded-lg bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="rounded-xl overflow-hidden bg-black/20 max-h-[400px] flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file!.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {!publicId && (
                  <button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="btn-gradient flex items-center gap-2 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload to Cloudinary
                      </>
                    )}
                  </button>
                )}
                {publicId && (
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Uploaded</span>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              <AnimatePresence>
                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4"
                  >
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {uploadError && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {uploadError}
                </div>
              )}
            </div>
          )}
        </GlassCard>

        {/* Generate Button */}
        {publicId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn-gradient-purple text-lg px-10 py-4 inline-flex items-center gap-3 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Brand Kit...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Brand Kit
                </>
              )}
            </button>
            <p className="text-sm text-muted-foreground mt-3">
              This will create 15+ assets and run AI analysis
            </p>
          </motion.div>
        )}

        {/* Features Preview */}
        {!preview && (
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-center mb-6">
              What You&apos;ll Get
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                'LinkedIn Banner',
                'YouTube Thumbnail',
                'Instagram Post',
                'Instagram Story',
                'X Banner',
                'Facebook Cover',
                'Website Hero',
                'Blog Cover',
                'Open Graph',
                'WebP + AVIF',
                'Transparent PNG',
                'Square Thumbnail',
                'Mobile Banner',
                'Desktop Banner',
                'AI Analysis',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="glass-card p-3 text-center text-sm"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default GeneratorPage
