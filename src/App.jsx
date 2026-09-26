import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Intro from './components/Intro'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Products from './pages/Products'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useTheme } from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'

function Layout({ theme, toggle }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  useReveal(pathname)

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <BrowserRouter>
      <Intro theme={theme} />
      <Routes>
        <Route element={<Layout theme={theme} toggle={toggle} />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
