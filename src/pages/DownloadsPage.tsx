import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  Archive,
  FileImage,
  Clock,
  Trash2,
  AlertCircle,
  Sparkles,
  FolderOpen,
} from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import { downloadImage } from '@/lib/cloudinary'
import type { GeneratedAsset } from '@/types'

interface DownloadBatch {
  id: string
  timestamp: number
  imageName: string
  previewUrl: string
  assets: GeneratedAsset[]
}

const DownloadsPage = () => {
  const [batches, setBatches] = useState<DownloadBatch[]>([])
  const [downloadingAll, setDownloadingAll] = useState<string | null>(null)

  useEffect(() => {
    loadBatches()
  }, [])

  const loadBatches = () => {
    const saved = localStorage.getItem('brandforge_download_batches')
    if (saved) {
      try {
        setBatches(JSON.parse(saved))
      } catch {
        // ignore
      }
    }

    // Also check current assets
    const currentAssets = localStorage.getItem('brandforge_current_assets')
    if (currentAssets) {
      try {
        const assets = JSON.parse(currentAssets)
        if (assets.length > 0) {
          const history = JSON.parse(localStorage.getItem('brandforge_history') || '[]')
          const latest = history[0]
          if (latest) {
            const newBatch: DownloadBatch = {
              id: latest.id,
              timestamp: latest.timestamp,
              imageName: latest.imageName,
              previewUrl: latest.previewUrl,
              assets,
            }
            setBatches((prev) => {
              const exists = prev.find((b) => b.id === newBatch.id)
              if (exists) return prev
              return [newBatch, ...prev]
            })
          }
        }
      } catch {
        // ignore
      }
    }
  }

  const handleDownloadAsset = async (asset: GeneratedAsset) => {
    await downloadImage(
      asset.downloadUrl,
      `brandforge-${asset.name.toLowerCase().replace(/\s+/g, '-')}.${asset.format === 'auto' ? 'png' : asset.format}`
    )
    const current = parseInt(localStorage.getItem('brandforge_downloads') || '0')
    localStorage.setItem('brandforge_downloads', String(current + 1))
  }

  const handleDownloadAll = async (batch: DownloadBatch) => {
    setDownloadingAll(batch.id)
    for (const asset of batch.assets) {
      await downloadImage(
        asset.downloadUrl,
        `brandforge-${asset.name.toLowerCase().replace(/\s+/g, '-')}.${asset.format === 'auto' ? 'png' : asset.format}`
      )
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    const current = parseInt(localStorage.getItem('brandforge_downloads') || '0')
    localStorage.setItem('brandforge_downloads', String(current + batch.assets.length))
    setDownloadingAll(null)
  }

  const handleDeleteBatch = (batchId: string) => {
    const updated = batches.filter((b) => b.id !== batchId)
    setBatches(updated)
    localStorage.setItem('brandforge_download_batches', JSON.stringify(updated))
  }

  const handleClearAll = () => {
    setBatches([])
    localStorage.removeItem('brandforge_download_batches')
    localStorage.removeItem('brandforge_current_assets')
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (batches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No Downloads Available</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Generate a brand kit first to see your downloadable assets here.
          </p>
          <a href="/generator" className="btn-gradient inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate Brand Kit
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Your <span className="text-gradient">Downloads</span>
            </h1>
            <p className="text-muted-foreground">
              {batches.reduce((acc, b) => acc + b.assets.length, 0)} assets across {batches.length} generation{batches.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm self-start"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        </div>

        {/* Batches */}
        <div className="space-y-6">
          {batches.map((batch, batchIndex) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: batchIndex * 0.1 }}
            >
              <GlassCard>
                {/* Batch Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 overflow-hidden flex items-center justify-center">
                      {batch.previewUrl ? (
                        <img
                          src={batch.previewUrl}
                          alt={batch.imageName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileImage className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{batch.imageName}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTime(batch.timestamp)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Archive className="w-3.5 h-3.5" />
                          {batch.assets.length} assets
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadAll(batch)}
                      disabled={downloadingAll === batch.id}
                      className="btn-gradient flex items-center gap-2 text-sm disabled:opacity-50"
                    >
                      {downloadingAll === batch.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download All
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteBatch(batch.id)}
                      className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Assets Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {batch.assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="glass rounded-lg overflow-hidden group"
                    >
                      <div className="aspect-video bg-black/20 relative overflow-hidden">
                        <img
                          src={asset.previewUrl}
                          alt={asset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <div className="absolute top-1.5 right-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-medium uppercase">
                            {asset.format}
                          </span>
                        </div>
                      </div>
                      <div className="p-2.5">
                        <h4 className="text-xs font-medium truncate mb-1">{asset.name}</h4>
                        <p className="text-[10px] text-muted-foreground mb-2">
                          {asset.width} x {asset.height}
                        </p>
                        <button
                          onClick={() => handleDownloadAsset(asset)}
                          className="w-full flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 glass-card p-4 flex items-start gap-3 border-blue-500/20"
        >
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-300 mb-1">Storage Note</p>
            <p className="text-muted-foreground">
              Assets are stored in your Cloudinary account. Downloaded files are saved to your device. 
              Clearing history only removes local records, not your Cloudinary uploads.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DownloadsPage
