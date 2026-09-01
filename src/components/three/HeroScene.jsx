import { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Lattice from './Lattice'
import StarField from './StarField'
import OrbitNodes from './OrbitNodes'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroScene({ sectionRef }) {
  const progress = useRef(0)

  useEffect(() => {
    if (!sectionRef.current) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=120%',
      scrub: 0.6,
      onUpdate: (self) => {
        progress.current = self.progress
      },
    })
    return () => st.kill()
  }, [sectionRef])

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 2, 4]} intensity={40} color="#2b6fff" />
      <pointLight position={[-4, -2, -3]} intensity={30} color="#ff8a3d" />
      <StarField count={600} radius={10} color="#8fb4ff" size={0.018} />
      <OrbitNodes scrollProgress={progress} />
      <Lattice scrollProgress={progress} />
    </Canvas>
  )
}
