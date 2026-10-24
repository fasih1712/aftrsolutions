import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Intro from './components/Intro'
import ChatWidget from './components/ChatWidget'
import HubSessionProvider from './components/HubSessionProvider'
import { HubLoader } from './components/RequireHub'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Products from './pages/Products'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import Hub from './pages/Hub'
import { useTheme } from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'

// Innovation Hub pages load on demand, so the public site bundle doesn't grow.
// They prerender as a loader (what they show depends on the visitor's session).
const HubLogin = lazy(() => import('./pages/hub/Login'))
const HubRequestAccess = lazy(() => import('./pages/hub/RequestAccess'))
const HubApp = lazy(() => import('./pages/hub/HubApp'))
const HubDemo = lazy(() => import('./pages/hub/HubDemo'))
const HubAccount = lazy(() => import('./pages/hub/Account'))
const HubAdmin = lazy(() => import('./pages/hub/Admin'))

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
        <Suspense fallback={<HubLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

// Router-agnostic app: wrapped in BrowserRouter in the browser (below) and in
// StaticRouter at build time (entry-server.jsx) to prerender every page.
export function AppShell() {
  const { theme, toggle } = useTheme()
  return (
    <HubSessionProvider>
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
          <Route path="privacy" element={<Privacy />} />
          <Route path="hub" element={<Hub />} />
          <Route path="hub/login" element={<HubLogin />} />
          <Route path="hub/request-access" element={<HubRequestAccess />} />
          <Route path="hub/app" element={<HubApp />} />
          <Route path="hub/demos/:slug" element={<HubDemo />} />
          <Route path="hub/account" element={<HubAccount />} />
          <Route path="hub/admin" element={<HubAdmin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HubSessionProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
