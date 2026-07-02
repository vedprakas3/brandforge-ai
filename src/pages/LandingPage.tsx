import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Upload,
  Zap,
  Download,
  Palette,
  Share2,
  Shield,
  ArrowRight,
  Image,
  Layers,
  Cpu,
  Globe,
  BookOpen,
} from 'lucide-react'
import GlassCard from '@/components/GlassCard'

const features = [
  {
    icon: Upload,
    title: 'One Upload',
    description: 'Upload your logo, product image, or brand asset. That\'s it.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered',
    description: 'Gemini AI analyzes your image and generates everything automatically.',
  },
  {
    icon: Layers,
    title: '15+ Formats',
    description: 'Get LinkedIn banners, YouTube thumbnails, Instagram posts & more.',
  },
  {
    icon: Palette,
    title: 'Color Palette',
    description: 'AI extracts dominant colors and suggests a cohesive brand palette.',
  },
  {
    icon: Share2,
    title: 'Ready to Share',
    description: 'Generated social posts, captions, and hashtags for every platform.',
  },
  {
    icon: Zap,
    title: 'Instant Download',
    description: 'Download all assets in optimized WebP, AVIF, PNG formats.',
  },
]

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Image',
    description: 'Drag & drop your logo, product photo, or brand image. We support JPG, PNG, WebP, and more.',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'AI Analysis',
    description: 'Gemini AI analyzes your image, extracts colors, and understands your brand context.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Generate Assets',
    description: 'Click "Generate Brand Kit" and watch as 15+ perfectly sized assets are created instantly.',
  },
  {
    number: '04',
    icon: Download,
    title: 'Download & Use',
    description: 'Preview, download, and copy Cloudinary URLs. Get React SDK and HTML code snippets.',
  },
]

const stats = [
  { value: '15+', label: 'Asset Formats' },
  { value: '50+', label: 'AI Features' },
  { value: '< 30s', label: 'Generation Time' },
  { value: '100%', label: 'Free to Use' },
]

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Cloudinary June Mini-Hack Project
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">One Upload</span>
            <br />
            <span className="text-gradient">Complete Brand Kit</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your brand image and let AI generate 15+ perfectly sized assets for every platform. 
            From LinkedIn banners to Instagram stories — all in one click.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/generator"
              className="btn-gradient text-lg px-8 py-4 flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Generate Brand Kit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/docs"
              className="px-8 py-4 rounded-xl glass border border-white/15 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Documentation
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card p-4 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-medium uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Everything You Need for <span className="text-gradient">Brand Consistency</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From social media to web optimization, BrandForge AI handles every aspect of your visual identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 text-sm font-medium uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              From Upload to <span className="text-gradient-alt">Brand Kit</span> in 4 Steps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and incredibly powerful. See how BrandForge AI transforms your workflow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card p-6 h-full">
                  <div className="text-5xl font-bold text-white/5 absolute top-4 right-4">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center mb-5">
                    <step.icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Types Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
              Asset Types
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              15+ Assets for <span className="text-gradient">Every Platform</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Social media, web, optimized formats, and banners — all generated from a single upload.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Globe, name: 'LinkedIn Banner', size: '1584 x 396' },
              { icon: Image, name: 'YouTube Thumbnail', size: '1280 x 720' },
              { icon: Share2, name: 'Instagram Post', size: '1080 x 1080' },
              { icon: Image, name: 'Instagram Story', size: '1080 x 1920' },
              { icon: Globe, name: 'X Banner', size: '1500 x 500' },
              { icon: Globe, name: 'Facebook Cover', size: '820 x 312' },
              { icon: MonitorIcon, name: 'Website Hero', size: '1920 x 1080' },
              { icon: FileTextIcon, name: 'Blog Cover', size: '1200 x 630' },
              { icon: Share2, name: 'Open Graph', size: '1200 x 630' },
              { icon: Zap, name: 'Optimized WebP', size: '1200 x 800' },
              { icon: Zap, name: 'Optimized AVIF', size: '1200 x 800' },
              { icon: Image, name: 'Transparent PNG', size: '800 x 800' },
              { icon: SquareIcon, name: 'Square Thumbnail', size: '400 x 400' },
              { icon: SmartphoneIcon, name: 'Mobile Banner', size: '320 x 100' },
              { icon: MonitorIcon, name: 'Desktop Banner', size: '728 x 90' },
            ].map((asset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-card p-4 text-center hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-cyan-500/20 transition-colors">
                  <asset.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-sm font-medium mb-1">{asset.name}</h4>
                <p className="text-xs text-muted-foreground">{asset.size}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-pink-400 text-sm font-medium uppercase tracking-wider">
              AI Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Smarter Than Just <span className="text-gradient-alt">Resizing</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gemini AI doesn&apos;t just resize — it understands, analyzes, and enhances your brand assets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: 'Smart Captions', desc: 'AI-generated captions that match your brand voice and image context.' },
              { icon: Globe, title: 'SEO Optimization', desc: 'Auto-generated SEO titles, meta descriptions, and structured data.' },
              { icon: Image, title: 'ALT Text', desc: 'Accessible alt text descriptions for every generated image.' },
              { icon: Share2, title: 'Hashtag Generator', desc: 'Trending, relevant hashtags tailored to your image content.' },
              { icon: FileTextIcon, title: 'Social Posts', desc: 'Platform-optimized social media posts with emojis and CTAs.' },
              { icon: Palette, title: 'Color Extraction', desc: 'Dominant color palette extraction for brand consistency.' },
              { icon: Cpu, title: 'Image Analysis', desc: 'Deep visual analysis of objects, style, mood, and composition.' },
              { icon: Shield, title: 'Accessibility', desc: 'WCAG-compliant suggestions for inclusive design.' },
              { icon: Zap, title: 'Format Optimization', desc: 'Best format selection (WebP, AVIF) for each use case.' },
            ].map((feature, index) => (
              <GlassCard key={index} delay={index * 0.1}>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="glass-card p-12 glow-purple">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Transform Your <span className="text-gradient">Brand?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of creators, startups, and developers who save hours with BrandForge AI.
              It&apos;s free and takes less than a minute.
            </p>
            <Link
              to="/generator"
              className="btn-gradient-purple text-lg px-10 py-4 inline-flex items-center gap-3"
            >
              <Sparkles className="w-5 h-5" />
              Start Generating
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

// Icon wrappers for consistent usage
function MonitorIcon({ className }: { className?: string }) {
  return <Globe className={className} />
}

function FileTextIcon({ className }: { className?: string }) {
  return <Image className={className} />
}

function SquareIcon({ className }: { className?: string }) {
  return <Layers className={className} />
}

function SmartphoneIcon({ className }: { className?: string }) {
  return <Zap className={className} />
}

export default LandingPage
