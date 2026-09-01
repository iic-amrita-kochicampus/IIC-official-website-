import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A handful of satellite "idea" nodes orbiting the central lattice on
// independent rings — reads as an active network, not a static model.
const RINGS = [
  { radius: 3.4, speed: 0.18, tilt: 0.4, color: '#2b6fff', count: 3 },
  { radius: 4.1, speed: -0.12, tilt: -0.25, color: '#ff8a3d', count: 4 },
  { radius: 4.7, speed: 0.09, tilt: 0.65, color: '#a5303f', count: 2 },
]

export default function OrbitNodes({ scrollProgress }) {
  const groupRef = useRef()
  const nodeRefs = useRef([])
  nodeRefs.current = []

  const nodes = useMemo(() => {
    const list = []
    RINGS.forEach((ring, ri) => {
      for (let i = 0; i < ring.count; i++) {
        list.push({
          ring,
          ringIndex: ri,
          offset: (i / ring.count) * Math.PI * 2 + ri,
        })
      }
    })
    return list
  }, [])

  useFrame((state, _delta) => {
    const progress = scrollProgress?.current ?? 1
    const t = state.clock.getElapsedTime()

    if (groupRef.current) {
      groupRef.current.visible = progress > 0.05
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.6, 1, progress))
    }

    nodeRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const { ring, offset } = nodes[i]
      const angle = t * ring.speed + offset
      const x = Math.cos(angle) * ring.radius
      const z = Math.sin(angle) * ring.radius
      const y = Math.sin(angle * 2 + offset) * ring.radius * ring.tilt * 0.3
      mesh.position.set(x, y, z)
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color={n.ring.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}
