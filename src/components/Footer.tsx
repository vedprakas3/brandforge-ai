import { Link } from 'react-router-dom'
import { Zap, Github, Twitter, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 glass mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">BrandForge AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              One upload. Complete brand kit. Transform your visual identity with AI-powered asset generation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/generator" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Generator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/preview" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Preview
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://cloudinary.com/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Cloudinary Docs
                </a>
              </li>
              <li>
                <a
                  href="https://ai.google.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Gemini API
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Built with <Heart className="w-4 h-4 inline text-red-500" /> for Cloudinary June Mini-Hack
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by <span className="text-blue-400">Cloudinary</span> + <span className="text-purple-400">Gemini AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
