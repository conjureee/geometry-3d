import { Canvas } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'

function Tetrahedron() {
  return (
    <mesh>
      <tetrahedronGeometry args={[1.5]} />
      <meshStandardMaterial color="#4f8ef7" wireframe={false} />
    </mesh>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
      <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Tetrahedron />
        <OrbitControls />
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}
