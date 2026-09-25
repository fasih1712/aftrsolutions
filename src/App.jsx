import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import Statement from './components/Statement'
import Products from './components/Products'
import Approach from './components/Approach'
import Why from './components/Why'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const { theme, toggle } = useTheme()
  useReveal()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <TechMarquee />
        <Services />
        <Statement />
        <Products />
        <Approach />
        <Why />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
