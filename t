[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex 2c554af..709a216 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -48,6 +48,29 @@[m
       "integrity": "sha512-uekIGetywIgopfD97oDL5PfeezkFpNhwlzlaEYNOA0N6ghdsOvh/HYjSMek5Q2O1PYvRSDFcqFVJl4r4ZBwOow==",[m
       "license": "Apache-2.0"[m
     },[m
[32m+[m[32m    "node_modules/@emnapi/core": {[m
[32m+[m[32m      "version": "1.11.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.11.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-zLpS5asjEb7lq8jYLq37N6XKaE41DIexlY1rF/z4/tIl3wo13Sqm28fRyfIsKZD+NZ8mM5RoKkpW/rBcuoSZSg==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "@emnapi/wasi-threads": "1.2.3",[m
[32m+[m[32m        "tslib": "^2.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
[32m+[m[32m    "node_modules/@emnapi/runtime": {[m
[32m+[m[32m      "version": "1.11.3",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.11.3.tgz",[m
[32m+[m[32m      "integrity": "sha512-Xz4Tpyki7XyrpbUK1jR1AhdAdaXyhhY4lZ3neLodmhpuWfy2PAQN5B46sAiU4liOXGLkHypn/qU+jvfWSCYYLA==",[m
[32m+[m[32m      "dev": true,[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "optional": true,[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "tslib": "^2.4.0"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/@emnapi/wasi-threads": {[m
       "version": "1.2.3",[m
       "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.3.tgz",[m
[36m@@ -524,7 +547,6 @@[m
       "resolved": "https://registry.npmjs.org/@react-three/fiber/-/fiber-9.6.1.tgz",[m
       "integrity": "sha512-zF0rsKcVYpcJwbFEnv2HkHX9cvOEgsfQo/X8lwmR2dn13S4qEQJXir9fxf5js2LQFoXqxOY7MDkOkYx2uZ4gSg==",[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "@babel/runtime": "^7.17.8",[m
         "@types/webxr": "*",[m
[36m@@ -1256,7 +1278,6 @@[m
       "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.17.tgz",[m
       "integrity": "sha512-MXfmqaVPEVgkBT/aY0aGCkRWWtByiYQXo3xdQ8r5RzuFrPiRn8Gar2tQdXSUQ2GKV3bkXckek89V8wQBY2Q/Aw==",[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "csstype": "^3.2.2"[m
       }[m
[36m@@ -1291,7 +1312,6 @@[m
       "resolved": "https://registry.npmjs.org/@types/three/-/three-0.185.1.tgz",[m
       "integrity": "sha512-db1xTb+EgYF2didW+eudSvVPtn75zo+fGsY8ShQrJY/B5ZBmC2Fiaykv3aImHAlCNEGuMPkPGXBJGLwzu5mC7A==",[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "@dimforge/rapier3d-compat": "~0.12.0",[m
         "@tweenjs/tween.js": "~23.1.3",[m
[36m@@ -2126,7 +2146,6 @@[m
       "integrity": "sha512-RvwwcruNjI1ncT5xRakeyS9Lf8lcItv34KD+aif+VH9kduAyfYBipGh12274xtenIPZ119/R9BdTBa8gAwSh0A==",[m
       "dev": true,[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "engines": {[m
         "node": ">=12"[m
       },[m
[36m@@ -2184,7 +2203,6 @@[m
       "resolved": "https://registry.npmjs.org/react/-/react-19.2.7.tgz",[m
       "integrity": "sha512-HNe9WslTbXmFK8o8cmwgAeJFSBvt1bPdHCVKtaaV+WlAN36mpT4hcRpwbf3fY56ar2oIXzsBpOAiIRHAdY0OlQ==",[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "engines": {[m
         "node": ">=0.10.0"[m
       }[m
[36m@@ -2194,7 +2212,6 @@[m
       "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.7.tgz",[m
       "integrity": "sha512-t0BRVXvbiE/o20Hfw669rLbMCDWtYZLvmJigy2f0MxsXF+71pxhR3xOkspmsO8h3ZlNzyibAmtCa3l4lYKk6gQ==",[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "scheduler": "^0.27.0"[m
       },[m
[36m@@ -2449,8 +2466,7 @@[m
       "version": "0.185.1",[m
       "resolved": "https://registry.npmjs.org/three/-/three-0.185.1.tgz",[m
       "integrity": "sha512-5aojFCXKwnjBRZvUnt3WFfEcvUJgkN5LlijRFN95hMy8WVkG4I0QNcJE+OuWvuJ0bOdStrbfXn0pkd6/QyiAlg==",[m
[31m-      "license": "MIT",[m
[31m-      "peer": true[m
[32m+[m[32m      "license": "MIT"[m
     },[m
     "node_modules/three-mesh-bvh": {[m
       "version": "0.8.3",[m
[36m@@ -2598,7 +2614,6 @@[m
       "integrity": "sha512-bTT9PsdWO+MQMNG9ZXIP/qM9wGh37DFxTV/sPq9cFpHr3w4jkgef032PkAL9jAqhk3Nz8NQw3O8n6/xFkqO4QQ==",[m
       "dev": true,[m
       "license": "MIT",[m
[31m-      "peer": true,[m
       "dependencies": {[m
         "lightningcss": "^1.32.0",[m
         "picomatch": "^4.0.5",[m
[1mdiff --git a/src/App.jsx b/src/App.jsx[m
[1mindex 56109e1..2c44081 100644[m
[1m--- a/src/App.jsx[m
[1m+++ b/src/App.jsx[m
[36m@@ -1,8 +1,7 @@[m
 import { Routes, Route, useLocation, Navigate } from 'react-router-dom'[m
[31m-import { useEffect } from 'react'[m
[32m+[m[32mimport { useEffect, lazy, Suspense } from 'react'[m
 import { ToastContainer } from 'react-toastify'[m
 import 'react-toastify/dist/ReactToastify.css'[m
[31m-[m
 import Navbar from './components/layout/Navbar'[m
 import Footer from './components/layout/Footer'[m
 import CustomCursor from './components/common/CustomCursor'[m
[36m@@ -10,26 +9,23 @@[m [mimport Preloader from './components/common/Preloader'[m
 import RouteTransition from './components/common/RouteTransition'[m
 import useLenis from './hooks/useLenis'[m
 [m
[31m-import AdminRoutes from './admin/routes/AdminRoutes'[m
[31m-[m
[31m-import Home from './pages/Home/Home'[m
[31m-import About from './pages/About/About'[m
[31m-import Leadership from './pages/Leadership/Leadership'[m
[31m-import Events from './pages/Events/Events'[m
[31m-import InnovationAmbassadors from './pages/InnovationAmbassadors/InnovationAmbassadors'[m
[31m-import Research from './pages/Research/Research'[m
[31m-import Projects from './pages/Projects/Projects'[m
[31m-import Establishment from './pages/Establishment/Establishment'[m
[31m-import Ideas from './pages/Ideas/Ideas'[m
[31m-import Contact from './pages/Contact/Contact'[m
[32m+[m[32mconst AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes'))[m
[32m+[m[32mconst Home = lazy(() => import('./pages/Home/Home'))[m
[32m+[m[32mconst About = lazy(() => import('./pages/About/About'))[m
[32m+[m[32mconst Leadership = lazy(() => import('./pages/Leadership/Leadership'))[m
[32m+[m[32mconst Events = lazy(() => import('./pages/Events/Events'))[m
[32m+[m[32mconst InnovationAmbassadors = lazy(() => import('./pages/InnovationAmbassadors/InnovationAmbassadors'))[m
[32m+[m[32mconst Research = lazy(() => import('./pages/Research/Research'))[m
[32m+[m[32mconst Projects = lazy(() => import('./pages/Projects/Projects'))[m
[32m+[m[32mconst Establishment = lazy(() => import('./pages/Establishment/Establishment'))[m
[32m+[m[32mconst Ideas = lazy(() => import('./pages/Ideas/Ideas'))[m
[32m+[m[32mconst Contact = lazy(() => import('./pages/Contact/Contact'))[m
 [m
 function ScrollToTop() {[m
   const { pathname } = useLocation()[m
[31m-[m
   useEffect(() => {[m
     window.scrollTo(0, 0)[m
   }, [pathname])[m
[31m-[m
   return null[m
 }[m
 [m
[36m@@ -37,16 +33,15 @@[m [mexport default function App() {[m
   useLenis()[m
   const location = useLocation()[m
   const isAdminRoute = location.pathname.startsWith('/admin')[m
[31m-[m
   return ([m
[31m-    [m
[31m-      <div className="bg-void min-h-screen">[m
[31m-        {!isAdminRoute && <Preloader />}[m
[31m-        {!isAdminRoute && <RouteTransition />}[m
[31m-        {!isAdminRoute && <CustomCursor />}[m
[31m-        {!isAdminRoute && <Navbar />}[m
[31m-        <ScrollToTop />[m
[31m-        <main>[m
[32m+[m[32m    <div className="bg-void min-h-screen">[m
[32m+[m[32m      {!isAdminRoute && <Preloader />}[m
[32m+[m[32m      {!isAdminRoute && <RouteTransition />}[m
[32m+[m[32m      {!isAdminRoute && <CustomCursor />}[m
[32m+[m[32m      {!isAdminRoute && <Navbar />}[m
[32m+[m[32m      <ScrollToTop />[m
[32m+[m[32m      <main>[m
[32m+[m[32m        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-fog text-sm font-mono">Loading…</div>}>[m
           <Routes>[m
             <Route path="/" element={<Home />} />[m
             <Route path="/about" element={<About />} />[m
[36m@@ -60,14 +55,14 @@[m [mexport default function App() {[m
             <Route path="/contact" element={<Contact />} />[m
             <Route path="/admin/*" element={<AdminRoutes />} />[m
           </Routes>[m
[31m-        </main>[m
[31m-        {!isAdminRoute && <Footer />}[m
[31m-        <ToastContainer[m
[31m-          position="bottom-right"[m
[31m-          theme="dark"[m
[31m-          toastClassName="!bg-ink !border !border-line !font-mono !text-sm"[m
[31m-        />[m
[31m-      </div>[m
[31m-    [m
[32m+[m[32m        </Suspense>[m
[32m+[m[32m      </main>[m
[32m+[m[32m      {!isAdminRoute && <Footer />}[m
[32m+[m[32m      <ToastContainer[m
[32m+[m[32m        position="bottom-right"[m
[32m+[m[32m        theme="dark"[m
[32m+[m[32m        toastClassName="!bg-ink !border !border-line !font-mono !text-sm"[m
[32m+[m[32m      />[m
[32m+[m[32m    </div>[m
   )[m
 }[m
[1mdiff --git a/src/pages/Home/Home.jsx b/src/pages/Home/Home.jsx[m
[1mindex 507dde9..164e037 100644[m
[1m--- a/src/pages/Home/Home.jsx[m
[1m+++ b/src/pages/Home/Home.jsx[m
[36m@@ -236,4 +236,4 @@[m [mexport default function Home() {[m
       </section>[m
     </>[m
   )[m
[31m-}[m
\ No newline at end of file[m
[32m+[m[32m}[m
