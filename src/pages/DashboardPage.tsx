import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Image,
  Sparkles,
  Download,
  Clock,
  ArrowRight,
  TrendingUp,
  Zap,
  FileImage,
  Layers,
  AlertCircle,
} from 'lucide-react'
import GlassCard from '@/components/GlassCard'

interface GenerationHistory {
  id: string
  imageName: string
  previewUrl: string
  assetsGenerated: number
  timestamp: number
  formats: string[]
}

const DashboardPage = () => {
  const [history, setHistory] = useState<GenerationHistory[]>([])
  const [stats, setStats] = useState({
    totalGenerations: 0,
    totalAssets: 0,
    totalDownloads: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem('brandforge_history')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setHistory(parsed.slice(0, 10))
        setStats({
          totalGenerations: parsed.length,
          totalAssets: parsed.reduce((acc: number, item: GenerationHistory) => acc + item.assetsGenerated, 0),
          totalDownloads: parseInt(localStorage.getItem('brandforge_downloads') || '0'),
        })
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your brand kit generations
            </p>
          </div>
          <Link
            to="/generator"
            className="btn-gradient flex items-center gap-2 self-start"
          >
            <Sparkles className="w-4 h-4" />
            New Generation
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <GlassCard delay={0}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalGenerations}</div>
                <div className="text-sm text-muted-foreground">Total Generations</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.1}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Layers className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalAssets}</div>
                <div className="text-sm text-muted-foreground">Assets Created</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.2}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Download className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Image,
              title: 'Generate Assets',
              desc: 'Upload and transform images',
              link: '/generator',
              color: 'blue',
            },
            {
              icon: FileImage,
              title: 'Preview Assets',
              desc: 'View generated brand kit',
              link: '/preview',
              color: 'purple',
            },
            {
              icon: Download,
              title: 'Downloads',
              desc: 'Access all your files',
              link: '/downloads',
              color: 'cyan',
            },
            {
              icon: Sparkles,
              title: 'Documentation',
              desc: 'Learn how to use',
              link: '/docs',
              color: 'pink',
            },
          ].map((action, index) => (
            <Link key={index} to={action.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-5 hover:border-white/20 transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg bg-${action.color}-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-5 h-5 text-${action.color}-400`} />
                </div>
                <h3 className="font-medium mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.desc}</p>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-3 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Recent Generations */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Generations</h2>
          <Link
            to="/generator"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-4 flex items-center gap-4 hover:border-white/20 transition-all"
              >
                <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
                  {item.previewUrl ? (
                    <img
                      src={item.previewUrl}
                      alt={item.imageName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{item.imageName}</h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      {item.assetsGenerated} assets
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(item.timestamp)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.formats?.slice(0, 3).map((format, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-white/5 text-xs font-medium uppercase"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <GlassCard>
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No generations yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Start by uploading your brand image to generate a complete brand kit with 15+ assets.
              </p>
              <Link to="/generator" className="btn-gradient inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Generate Your First Brand Kit
              </Link>
            </div>
          </GlassCard>
        )}

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 glass-card p-4 flex items-start gap-3 border-blue-500/20"
        >
          <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-300 mb-1">Getting Started</p>
            <p className="text-muted-foreground">
              Make sure to configure your API keys in{' '}
              <Link to="/settings" className="text-blue-400 hover:underline">
                Settings
              </Link>{' '}
              before generating assets. You need a Cloudinary account (free) and a Gemini API key (free).
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DashboardPage
