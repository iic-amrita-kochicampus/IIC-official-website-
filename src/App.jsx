import { Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/common/CustomCursor'
import Preloader from './components/common/Preloader'
import RouteTransition from './components/common/RouteTransition'
import Loader from './components/common/Loader'
import useLenis from './hooks/useLenis'

const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes'))

const Home = lazy(() => import('./pages/Home/Home'))
const About = lazy(() => import('./pages/About/About'))
const Leadership = lazy(() => import('./pages/Leadership/Leadership'))
const Events = lazy(() => import('./pages/Events/Events'))
const InnovationAmbassadors = lazy(() => import('./pages/InnovationAmbassadors/InnovationAmbassadors'))
const Research = lazy(() => import('./pages/Research/Research'))
const Projects = lazy(() => import('./pages/Projects/Projects'))
const Establishment = lazy(() => import('./pages/Establishment/Establishment'))
const Ideas = lazy(() => import('./pages/Ideas/Ideas'))
const Contact = lazy(() => import('./pages/Contact/Contact'))

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
       
       <div className="bg-void min-h-screen flex flex-col">
         {!isAdminRoute && <Preloader />}
         {!isAdminRoute && <RouteTransition />}
         {!isAdminRoute && <CustomCursor />}
         {!isAdminRoute && <Navbar />}
         <ScrollToTop />
         <main className="flex-1">
           <Suspense
             fallback={
               <div className="min-h-[60vh] flex items-center justify-center">
                 <Loader />
               </div>
             }
           >
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
           </Suspense>
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
