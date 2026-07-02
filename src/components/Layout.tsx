import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import AnimatedBackground from './AnimatedBackground'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <main className={isLanding ? '' : 'pt-20'}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
