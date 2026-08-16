import { Canvas } from '@react-three/fiber'
import StarField from './StarField'
import { useState } from 'react'

// Lightweight, non-interactive 3D backdrop for inner-page heroes.
// Absolutely positioned — the parent section must have `relative`.
export default function AmbientCanvas({ className = '', color = '#2b6fff', count = 450 }) {
  const [contextLost, setContextLost] = useState(false)

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {!contextLost && (
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          onContextLost={(e) => {
            e.preventDefault()
            setContextLost(true)
            console.warn('WebGL context lost, attempting to restore...')
          }}
          onContextRestored={() => {
            setContextLost(false)
            console.log('WebGL context restored')
          }}
        >
          <StarField count={count} radius={8} color={color} size={0.02} />
        </Canvas>
      )}
      {contextLost && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/50 text-fog text-sm font-mono">
          <p>3D background temporarily unavailable</p>
        </div>
      )}
    </div>
  )
}
