import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download,
  Copy,
  Check,
  Code,
  Image,
  Layers,
  Sparkles,
  AlertCircle,
  Link as LinkIcon,
  Eye,
  X,
} from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import { copyToClipboard, downloadImage } from '@/lib/cloudinary'
import type { GeneratedAsset, AIResult } from '@/types'

type CategoryFilter = 'all' | 'social' | 'web' | 'optimized' | 'banner'

const PreviewPage = () => {
  const [assets, setAssets] = useState<GeneratedAsset[]>([])
  const [aiResults, setAiResults] = useState<AIResult | null>(null)
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all')
  const [selectedAsset, setSelectedAsset] = useState<GeneratedAsset | null>(null)
  const [copiedId, setCopiedId] = useState<string>('')
  const [codeTab, setCodeTab] = useState<'react' | 'html'>('react')
  const [showAiPanel, setShowAiPanel] = useState(false)

  useEffect(() => {
    const savedAssets = localStorage.getItem('brandforge_current_assets')
    const savedAi = localStorage.getItem('brandforge_current_ai')
    if (savedAssets) {
      try {
        setAssets(JSON.parse(savedAssets))
      } catch {
        // ignore
      }
    }
    if (savedAi) {
      try {
        setAiResults(JSON.parse(savedAi))
      } catch {
        // ignore
      }
    }
  }, [])

  const filteredAssets = activeFilter === 'all'
    ? assets
    : assets.filter((a) => a.category === activeFilter)

  const handleCopy = async (text: string, id: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(''), 2000)
    }
  }

  const handleDownload = async (asset: GeneratedAsset) => {
    await downloadImage(asset.downloadUrl, `brandforge-${asset.name.toLowerCase().replace(/\s+/g, '-')}.${asset.format === 'auto' ? 'png' : asset.format}`)
    const current = parseInt(localStorage.getItem('brandforge_downloads') || '0')
    localStorage.setItem('brandforge_downloads', String(current + 1))
  }

  const handleDownloadAll = async () => {
    for (const asset of assets) {
      await downloadImage(asset.downloadUrl, `brandforge-${asset.name.toLowerCase().replace(/\s+/g, '-')}.${asset.format === 'auto' ? 'png' : asset.format}`)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    const current = parseInt(localStorage.getItem('brandforge_downloads') || '0')
    localStorage.setItem('brandforge_downloads', String(current + assets.length))
  }

  const filters: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All Assets' },
    { value: 'social', label: 'Social Media' },
    { value: 'web', label: 'Web' },
    { value: 'optimized', label: 'Optimized' },
    { value: 'banner', label: 'Banners' },
  ]

  if (assets.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Image className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No Assets Generated Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Upload your brand image in the generator to create a complete brand kit with 15+ assets.
          </p>
          <a href="/generator" className="btn-gradient inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Go to Generator
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Your <span className="text-gradient">Brand Kit</span>
            </h1>
            <p className="text-muted-foreground">
              {assets.length} assets generated • Preview, download, and copy URLs
            </p>
          </div>
          <div className="flex items-center gap-3">
            {aiResults && (
              <button
                onClick={() => setShowAiPanel(!showAiPanel)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  showAiPanel
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'glass border border-white/10 hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Insights
              </button>
            )}
            <button
              onClick={handleDownloadAll}
              className="btn-gradient flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className={`flex-1 ${showAiPanel ? 'lg:w-2/3' : 'w-full'}`}>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter.value
                      ? 'bg-white/10 text-white border border-white/15'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="glass-card overflow-hidden group"
                  >
                    {/* Preview */}
                    <div
                      className="aspect-video bg-black/20 relative overflow-hidden cursor-pointer"
                      onClick={() => setSelectedAsset(asset)}
                    >
                      <img
                        src={asset.previewUrl}
                        alt={asset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white">
                          <Eye className="w-5 h-5" />
                          <span className="text-sm font-medium">View</span>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 rounded-md bg-black/60 text-xs font-medium uppercase">
                          {asset.format}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-sm">{asset.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {asset.width} x {asset.height}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {asset.description}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDownload(asset)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                        <button
                          onClick={() => handleCopy(asset.transformationUrl, `copy-${asset.id}`)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-muted-foreground text-xs font-medium hover:bg-white/10 transition-colors"
                        >
                          {copiedId === `copy-${asset.id}` ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          URL
                        </button>
                        <button
                          onClick={() => setSelectedAsset(asset)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-muted-foreground text-xs font-medium hover:bg-white/10 transition-colors"
                        >
                          <Code className="w-3.5 h-3.5" />
                          Code
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* AI Insights Panel */}
          <AnimatePresence>
            {showAiPanel && aiResults && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="lg:w-1/3 overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Caption */}
                  <GlassCard>
                    <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      AI Caption
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {aiResults.caption}
                    </p>
                  </GlassCard>

                  {/* SEO */}
                  <GlassCard>
                    <h4 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      SEO Content
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground text-xs">Title:</span>
                        <p className="text-white">{aiResults.seoTitle}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Meta:</span>
                        <p className="text-muted-foreground">{aiResults.metaDescription}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">ALT:</span>
                        <p className="text-muted-foreground">{aiResults.altText}</p>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Hashtags */}
                  <GlassCard>
                    <h4 className="text-sm font-medium text-pink-300 mb-2 flex items-center gap-2">
                      <LinkIcon className="w-4 h-4" />
                      Hashtags
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {aiResults.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md bg-pink-500/10 text-pink-300 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Color Palette */}
                  <GlassCard>
                    <h4 className="text-sm font-medium text-cyan-300 mb-2 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      Color Palette
                    </h4>
                    <div className="flex gap-2">
                      {aiResults.colorPalette.map((color, i) => (
                        <div key={i} className="flex-1">
                          <div
                            className="w-full h-10 rounded-lg mb-1 border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-[10px] text-center text-muted-foreground">{color}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Social Post */}
                  <GlassCard>
                    <h4 className="text-sm font-medium text-green-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Social Post
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {aiResults.socialPost}
                    </p>
                  </GlassCard>

                  {/* Accessibility */}
                  <GlassCard>
                    <h4 className="text-sm font-medium text-yellow-300 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Accessibility
                    </h4>
                    <ul className="space-y-1.5">
                      {aiResults.accessibilitySuggestions.map((suggestion, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Asset Detail Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-3xl max-h-[90vh] overflow-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-semibold">{selectedAsset.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAsset.width} x {selectedAsset.height} • {selectedAsset.format.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Preview */}
                <div className="rounded-xl overflow-hidden bg-black/20">
                  <img
                    src={selectedAsset.previewUrl}
                    alt={selectedAsset.name}
                    className="w-full h-auto max-h-[400px] object-contain mx-auto"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleDownload(selectedAsset)}
                    className="btn-gradient flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleCopy(selectedAsset.transformationUrl, 'modal-copy')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    {copiedId === 'modal-copy' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    Copy URL
                  </button>
                  <a
                    href={selectedAsset.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Open
                  </a>
                </div>

                {/* Cloudinary URL */}
                <div>
                  <label className="block text-sm font-medium mb-2">Cloudinary Transformation URL</label>
                  <div className="code-block text-xs break-all">
                    {selectedAsset.transformationUrl}
                  </div>
                </div>

                {/* Code Examples */}
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <button
                      onClick={() => setCodeTab('react')}
                      className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                        codeTab === 'react'
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-muted-foreground hover:text-white'
                      }`}
                    >
                      React SDK
                    </button>
                    <button
                      onClick={() => setCodeTab('html')}
                      className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
                        codeTab === 'html'
                          ? 'border-blue-400 text-blue-400'
                          : 'border-transparent text-muted-foreground hover:text-white'
                      }`}
                    >
                      HTML
                    </button>
                  </div>
                  <div className="code-block text-xs">
                    <pre>{codeTab === 'react' ? selectedAsset.reactSdkCode : selectedAsset.htmlCode}</pre>
                  </div>
                  <button
                    onClick={() =>
                      handleCopy(
                        codeTab === 'react' ? selectedAsset.reactSdkCode : selectedAsset.htmlCode,
                        'code-copy'
                      )
                    }
                    className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {copiedId === 'code-copy' ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PreviewPage
