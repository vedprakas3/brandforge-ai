import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Code,
  Upload,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  AlertCircle,
  Zap,
  ExternalLink,
} from 'lucide-react'
import GlassCard from '@/components/GlassCard'

type DocSection = 'getting-started' | 'cloudinary' | 'gemini' | 'usage' | 'api' | 'examples'

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState<DocSection>('getting-started')
  const [copiedId, setCopiedId] = useState<string>('')

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(''), 2000)
    } catch {
      // ignore
    }
  }

  const sections: { id: DocSection; label: string; icon: typeof BookOpen }[] = [
    { id: 'getting-started', label: 'Getting Started', icon: BookOpen },
    { id: 'cloudinary', label: 'Cloudinary Setup', icon: Upload },
    { id: 'gemini', label: 'Gemini AI Setup', icon: Sparkles },
    { id: 'usage', label: 'How to Use', icon: Zap },
    { id: 'api', label: 'API Reference', icon: Code },
    { id: 'examples', label: 'Code Examples', icon: Code },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Getting Started with BrandForge AI</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BrandForge AI is a powerful tool that transforms a single image upload into a complete brand kit. 
                Using Cloudinary for image transformations and Gemini AI for intelligent content generation, 
                you can create 15+ perfectly sized assets in seconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: '1',
                  title: 'Configure APIs',
                  desc: 'Add your Cloudinary and Gemini API keys in Settings',
                },
                {
                  step: '2',
                  title: 'Upload Image',
                  desc: 'Upload your logo, product image, or brand asset',
                },
                {
                  step: '3',
                  title: 'Generate & Download',
                  desc: 'Get 15+ assets with AI-generated content',
                },
              ].map((item) => (
                <div key={item.step} className="glass-card p-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                    <span className="text-sm font-bold text-blue-400">{item.step}</span>
                  </div>
                  <h3 className="font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5 border-yellow-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-yellow-300 mb-2">Prerequisites</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-yellow-500" />
                      Free Cloudinary account (for image storage & transformations)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-yellow-500" />
                      Free Gemini API key from Google AI Studio (for AI features)
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-yellow-500" />
                      Modern web browser with JavaScript enabled
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'cloudinary':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Cloudinary Setup</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cloudinary powers all image transformations in BrandForge AI. Follow these steps to set up your account.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Create a Cloudinary Account',
                  content: (
                    <>
                      <p className="text-sm text-muted-foreground mb-3">
                        Go to{' '}
                        <a
                          href="https://cloudinary.com/users/register/free"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          cloudinary.com <ExternalLink className="w-3 h-3" />
                        </a>{' '}
                        and sign up for a free account. The free tier includes 25 monthly credits,
                        which is more than enough for brand kit generation.
                      </p>
                    </>
                  ),
                },
                {
                  title: 'Get Your Cloud Name',
                  content: (
                    <>
                      <p className="text-sm text-muted-foreground mb-3">
                        After logging in, your cloud name is displayed on the dashboard. It looks like this:
                      </p>
                      <div className="code-block text-sm">
                        https://console.cloudinary.com/your-cloud-name/console
                      </div>
                    </>
                  ),
                },
                {
                  title: 'Create an Upload Preset',
                  content: (
                    <>
                      <p className="text-sm text-muted-foreground mb-3">
                        BrandForge uses unsigned uploads for simplicity. Create an upload preset:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Go to Settings → Upload</li>
                        <li>Scroll to &quot;Upload presets&quot; and click &quot;Add upload preset&quot;</li>
                        <li>Set the preset name: <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">brandforge_unsigned</code></li>
                        <li>Set &quot;Signing Mode&quot; to <strong>Unsigned</strong></li>
                        <li>Click &quot;Save&quot;</li>
                      </ol>
                    </>
                  ),
                },
                {
                  title: 'Add to BrandForge Settings',
                  content: (
                    <>
                      <p className="text-sm text-muted-foreground mb-3">
                        Go to the{' '}
                        <a href="/settings" className="text-blue-400 hover:underline">
                          Settings page
                        </a>{' '}
                        in BrandForge and enter:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Your Cloud Name</li>
                        <li>Your Upload Preset (default: brandforge_unsigned)</li>
                      </ul>
                    </>
                  ),
                },
              ].map((step, index) => (
                <div key={index} className="glass-card p-5">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  {step.content}
                </div>
              ))}
            </div>
          </div>
        )

      case 'gemini':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Gemini AI Setup</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gemini AI provides intelligent image analysis, caption generation, SEO optimization, 
                color extraction, and accessibility suggestions. It&apos;s completely free to use.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Get Your API Key',
                  steps: [
                    'Go to Google AI Studio (aistudio.google.com)',
                    'Sign in with your Google account',
                    'Click "Get API Key" in the navigation bar',
                    'Click "Create API Key"',
                    'Copy your API key (starts with AIzaSy...)',
                  ],
                },
                {
                  title: 'Add to BrandForge',
                  steps: [
                    'Go to the Settings page in BrandForge',
                    'Switch to the "Gemini AI" tab',
                    'Paste your API key',
                    'Click "Save Settings"',
                  ],
                },
              ].map((section, index) => (
                <div key={index} className="glass-card p-5">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center text-xs text-purple-400">
                      {index + 1}
                    </span>
                    {section.title}
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    {section.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <div className="glass-card p-5 border-purple-500/20">
              <h3 className="font-medium text-purple-300 mb-3">AI Features Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Smart Image Captions',
                  'SEO Title Generation',
                  'Meta Description',
                  'ALT Text for Accessibility',
                  'Hashtag Suggestions',
                  'Social Media Posts',
                  'Color Palette Extraction',
                  'Image Analysis',
                  'Accessibility Suggestions',
                  'Format Optimization Tips',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'usage':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">How to Use BrandForge AI</h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Upload Your Image',
                  desc: 'Go to the Generator page and upload your logo, product image, or brand asset. You can drag & drop or click to browse.',
                  tip: 'For best results, use high-resolution images (at least 1200px wide).',
                },
                {
                  title: 'Upload to Cloudinary',
                  desc: 'Click "Upload to Cloudinary" to store your image and enable transformations. This is required before generating assets.',
                  tip: 'Images are stored in your own Cloudinary account, giving you full control.',
                },
                {
                  title: 'Generate Your Brand Kit',
                  desc: 'Click "Generate Brand Kit" to create 15+ assets. If Gemini AI is configured, it will also analyze your image and generate content.',
                  tip: 'Generation typically takes 10-30 seconds depending on your connection.',
                },
                {
                  title: 'Preview & Download',
                  desc: 'Go to the Preview page to see all generated assets. Click on any asset for detailed view, code examples, and download options.',
                  tip: 'Use the category filters to quickly find specific asset types.',
                },
                {
                  title: 'Get Code Snippets',
                  desc: 'Click on any asset to view React SDK and HTML code snippets. Copy the Cloudinary transformation URL for custom use.',
                  tip: 'The React SDK uses next-cloudinary for optimal Next.js integration.',
                },
              ].map((step, index) => (
                <div key={index} className="glass-card p-5">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold text-cyan-400 shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
                      <p className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-2 rounded-lg inline-block">
                        Tip: {step.tip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-5 border-cyan-500/20">
              <h3 className="font-medium text-cyan-300 mb-3">Supported Asset Types</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'LinkedIn Banner', size: '1584 x 396', cat: 'Social' },
                  { name: 'YouTube Thumbnail', size: '1280 x 720', cat: 'Social' },
                  { name: 'Instagram Post', size: '1080 x 1080', cat: 'Social' },
                  { name: 'Instagram Story', size: '1080 x 1920', cat: 'Social' },
                  { name: 'X Banner', size: '1500 x 500', cat: 'Social' },
                  { name: 'Facebook Cover', size: '820 x 312', cat: 'Social' },
                  { name: 'Website Hero', size: '1920 x 1080', cat: 'Web' },
                  { name: 'Blog Cover', size: '1200 x 630', cat: 'Web' },
                  { name: 'Open Graph', size: '1200 x 630', cat: 'Web' },
                  { name: 'Optimized WebP', size: '1200 x 800', cat: 'Optimized' },
                  { name: 'Optimized AVIF', size: '1200 x 800', cat: 'Optimized' },
                  { name: 'Transparent PNG', size: '800 x 800', cat: 'Optimized' },
                  { name: 'Square Thumbnail', size: '400 x 400', cat: 'Optimized' },
                  { name: 'Mobile Banner', size: '320 x 100', cat: 'Banner' },
                  { name: 'Desktop Banner', size: '728 x 90', cat: 'Banner' },
                ].map((asset, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-muted-foreground">{asset.name}</span>
                    <span className="text-xs text-white/30 ml-auto">{asset.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'api':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">API Reference</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BrandForge AI uses Cloudinary&apos;s transformation API. Here are the key parameters and examples.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-card p-5">
                <h3 className="font-medium mb-3">Cloudinary URL Structure</h3>
                <div className="code-block text-sm">
                  https://res.cloudinary.com/&#123;cloud_name&#125;/image/upload/&#123;transformations&#125;/&#123;public_id&#125;
                </div>
              </div>

              <div className="glass-card p-5">
                <h3 className="font-medium mb-3">Common Transformations</h3>
                <div className="space-y-3">
                  {[
                    { param: 'w_1200', desc: 'Set width to 1200px' },
                    { param: 'h_800', desc: 'Set height to 800px' },
                    { param: 'c_fill', desc: 'Crop to fill dimensions' },
                    { param: 'c_fit', desc: 'Fit within dimensions' },
                    { param: 'c_thumb', desc: 'Thumbnail crop (centered)' },
                    { param: 'f_webp', desc: 'Convert to WebP format' },
                    { param: 'f_avif', desc: 'Convert to AVIF format' },
                    { param: 'f_png', desc: 'Convert to PNG format' },
                    { param: 'q_auto', desc: 'Automatic quality optimization' },
                    { param: 'q_auto:good', desc: 'Good quality (smaller file)' },
                    { param: 'q_auto:best', desc: 'Best quality (larger file)' },
                    { param: 'bo_2px_solid_white', desc: 'Add white border' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm">
                      <code className="bg-white/10 px-2 py-1 rounded text-xs font-mono text-blue-300 min-w-[140px]">
                        {item.param}
                      </code>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5">
                <h3 className="font-medium mb-3">Example URLs</h3>
                {[
                  {
                    label: 'LinkedIn Banner (1584x396)',
                    url: 'https://res.cloudinary.com/demo/image/upload/w_1584,h_396,c_fill,q_auto/sample',
                  },
                  {
                    label: 'Instagram Post (1080x1080)',
                    url: 'https://res.cloudinary.com/demo/image/upload/w_1080,h_1080,c_fill,q_auto/sample',
                  },
                  {
                    label: 'Optimized WebP',
                    url: 'https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill,f_webp,q_auto/sample',
                  },
                ].map((example, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-sm font-medium mb-1">{example.label}</p>
                    <div className="code-block text-xs break-all">{example.url}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'examples':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Code Examples</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Copy-paste ready code snippets for integrating BrandForge assets into your projects.
              </p>
            </div>

            <div className="space-y-4">
              {/* React SDK */}
              <div className="glass-card p-5">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-400" />
                  React SDK (next-cloudinary)
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  First, install the package:
                </p>
                <div className="code-block text-sm mb-3">
                  npm install next-cloudinary
                </div>
                <p className="text-sm text-muted-foreground mb-3">Then use in your component:</p>
                <div className="relative">
                  <pre className="code-block text-xs overflow-x-auto">
{`import { CldImage } from 'next-cloudinary';

// LinkedIn Banner
<CldImage
  src="your-public-id"
  width={1584}
  height={396}
  alt="LinkedIn Banner"
  crop="fill"
  quality="auto"
  format="auto"
/>

// Instagram Post
<CldImage
  src="your-public-id"
  width={1080}
  height={1080}
  alt="Instagram Post"
  crop="fill"
  quality="auto"
  format="auto"
/>`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import { CldImage } from 'next-cloudinary';\n\n<CldImage\n  src="your-public-id"\n  width={1584}\n  height={396}\n  alt="LinkedIn Banner"\n  crop="fill"\n  quality="auto"\n  format="auto"\n/>`, 'react-sdk')}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copiedId === 'react-sdk' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* HTML */}
              <div className="glass-card p-5">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-purple-400" />
                  Plain HTML
                </h3>
                <div className="relative">
                  <pre className="code-block text-xs overflow-x-auto">
{`<!-- LinkedIn Banner -->
<img
  src="https://res.cloudinary.com/your-cloud/image/upload/w_1584,h_396,c_fill,q_auto/your-image"
  width="1584"
  height="396"
  alt="LinkedIn Banner"
  loading="lazy"
/>

<!-- Responsive with srcset -->
<img
  src="https://res.cloudinary.com/your-cloud/image/upload/w_1200,h_800,c_fill,q_auto/your-image"
  srcset="
    https://res.cloudinary.com/your-cloud/image/upload/w_400,h_400,c_fill,q_auto/your-image 400w,
    https://res.cloudinary.com/your-cloud/image/upload/w_800,h_600,c_fill,q_auto/your-image 800w,
    https://res.cloudinary.com/your-cloud/image/upload/w_1200,h_800,c_fill,q_auto/your-image 1200w
  "
  sizes="(max-width: 800px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Responsive Image"
  loading="lazy"
/>`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`<img\n  src="https://res.cloudinary.com/your-cloud/image/upload/w_1584,h_396,c_fill,q_auto/your-image"\n  width="1584"\n  height="396"\n  alt="LinkedIn Banner"\n  loading="lazy"\n/>`, 'html-code')}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copiedId === 'html-code' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* JavaScript SDK */}
              <div className="glass-card p-5">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  JavaScript SDK
                </h3>
                <div className="relative">
                  <pre className="code-block text-xs overflow-x-auto">
{`// Using Cloudinary JavaScript SDK
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { webp } from '@cloudinary/url-gen/qualifiers/format';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'your-cloud-name'
  }
});

const img = cld.image('your-public-id')
  .resize(fill().width(1584).height(396))
  .delivery(format(webp()))
  .delivery(quality('auto'));

const imageUrl = img.toURL();
console.log(imageUrl);`}
                  </pre>
                  <button
                    onClick={() => handleCopy(`import { Cloudinary } from '@cloudinary/url-gen';\nimport { fill } from '@cloudinary/url-gen/actions/resize';\n\nconst cld = new Cloudinary({\n  cloud: {\n    cloudName: 'your-cloud-name'\n  }\n});\n\nconst img = cld.image('your-public-id')\n  .resize(fill().width(1584).height(396));\n\nconst imageUrl = img.toURL();`, 'js-sdk')}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copiedId === 'js-sdk' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-6"
      >
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="glass-card p-4 sticky top-24">
            <h2 className="font-semibold mb-4 px-2">Documentation</h2>
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-white/10 text-white'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <GlassCard>{renderContent()}</GlassCard>
        </div>
      </motion.div>
    </div>
  )
}

export default DocumentationPage
