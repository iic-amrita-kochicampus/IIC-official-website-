import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Generates points on an icosahedron surface (subdivided) to use as "idea nodes"
function useIcosaPoints(detail = 2) {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.1, detail)
    const posAttr = geo.getAttribute('position')
    const pts = []
    const seen = new Set()
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)
      const z = posAttr.getZ(i)
      const key = `${x.toFixed(2)}_${y.toFixed(2)}_${z.toFixed(2)}`
      if (seen.has(key)) continue
      seen.add(key)
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [detail])
}

export default function Lattice({ scrollProgress }) {
  const groupRef = useRef()
  const nodesRef = useRef()
  const linesRef = useRef()
  const points = useIcosaPoints(2)

  // Random scattered start positions (the "before" state — disconnected ideas)
  const scattered = useMemo(
    () => points.map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    )),
    [points]
  )

  const lineGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.1, 2)
    return new THREE.WireframeGeometry(geo)
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const progress = scrollProgress?.current ?? 1

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.15
      // Mouse-reactive tilt
      const mx = (state.pointer.x || 0) * 0.25
      const my = (state.pointer.y || 0) * 0.15
      groupRef.current.rotation.y += mx * delta
      groupRef.current.rotation.x += my * delta
    }

    if (nodesRef.current) {
      const arr = nodesRef.current.geometry.attributes.position.array
      for (let i = 0; i < points.length; i++) {
        const target = points[i]
        const start = scattered[i]
        const x = THREE.MathUtils.lerp(start.x, target.x, progress)
        const y = THREE.MathUtils.lerp(start.y, target.y, progress)
        const z = THREE.MathUtils.lerp(start.z, target.z, progress)
        arr[i * 3] = x
        arr[i * 3 + 1] = y
        arr[i * 3 + 2] = z
      }
      nodesRef.current.geometry.attributes.position.needsUpdate = true
    }

    if (linesRef.current) {
      linesRef.current.material.opacity = progress * 0.5
    }
  })

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(scattered.length * 3)
    scattered.forEach((p, i) => {
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [scattered])

  return (
    <group ref={groupRef}>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#2b6fff" transparent opacity={0} />
      </lineSegments>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={scattered.length}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#ff8a3d" size={0.055} sizeAttenuation transparent opacity={0.95} />
      </points>
    </group>
  )
}
