import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Ambient depth layer of drifting points — reusable behind any section's
// hero to raise the 3D presence across the site without a heavy scene.
export default function StarField({ count = 700, radius = 9, color = '#2b6fff', size = 0.02 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribute in a flattened sphere shell so it reads as depth, not a ball
      const r = radius * (0.4 + Math.random() * 0.6)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.015
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  )
}
