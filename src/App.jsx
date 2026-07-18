import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/common/CustomCursor'
import Preloader from './components/common/Preloader'
import RouteTransition from './components/common/RouteTransition'
import useLenis from './hooks/useLenis'

import AdminRoutes from './admin/routes/AdminRoutes'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Leadership from './pages/Leadership/Leadership'
import Events from './pages/Events/Events'
import InnovationAmbassadors from './pages/InnovationAmbassadors/InnovationAmbassadors'
import Research from './pages/Research/Research'
import Projects from './pages/Projects/Projects'
import Establishment from './pages/Establishment/Establishment'
import Ideas from './pages/Ideas/Ideas'
import Contact from './pages/Contact/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  useLenis()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    
      <div className="bg-void min-h-screen">
        {!isAdminRoute && <Preloader />}
        {!isAdminRoute && <RouteTransition />}
        {!isAdminRoute && <CustomCursor />}
        {!isAdminRoute && <Navbar />}
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Leadership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/ambassadors" element={<InnovationAmbassadors />} />
            <Route path="/research" element={<Research />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/establishment" element={<Establishment />} />
            <Route path="/ideas-queries" element={<Ideas />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
        <ToastContainer
          position="bottom-right"
          theme="dark"
          toastClassName="!bg-ink !border !border-line !font-mono !text-sm"
        />
      </div>
    
  )
}
