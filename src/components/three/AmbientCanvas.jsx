import { Canvas } from '@react-three/fiber'
import StarField from './StarField'

// Lightweight, non-interactive 3D backdrop for inner-page heroes.
// Absolutely positioned — the parent section must have `relative`.
export default function AmbientCanvas({ className = '', color = '#2b6fff', count = 450 }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
        <StarField count={count} radius={8} color={color} size={0.02} />
      </Canvas>
    </div>
  )
}
