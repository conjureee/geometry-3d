import { Canvas } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import Tetrahedron from './components/shapes/Tetrahedron'
// import Cylinder from './components/shapes/Cylinder'
// import Sphere from './components/shapes/Sphere'
// import Cone from './components/shapes/Cone'
// import Cube from './components/shapes/Cube'

export default function App() {
    return (
        <div style={{ width: '100vw', height: '100vh', background: '#1a1a2e' }}>
            <Canvas camera={{ position: [3, 3, 3], fov: 65 }}>

                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 2, -5]} intensity={0.3} />

                <Tetrahedron />
                {/*<Cylinder />*/}
                {/*<Sphere />*/}
                {/*<Cone />*/}
                {/*<Cube />*/}

                <OrbitControls />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport />
                </GizmoHelper>
            </Canvas>
        </div>
    )
}