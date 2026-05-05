import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import Sidebar from './components/UI/Sidebar'
import Tetrahedron from './components/shapes/Tetrahedron'
import Cube from './components/shapes/Cube'
import Sphere from './components/shapes/Sphere'
import Cone from './components/shapes/Cone'
import Cylinder from './components/shapes/Cylinder'
import Cuboid from './components/shapes/Cuboid'
import Torus from './components/shapes/Torus'
import Prizm from './components/shapes/Prizm'
import Ellipsoid from './components/shapes/Ellipsoid'
import Pyramid from './components/shapes/Pyramid'

const shapeMap = {
    tetrahedron: <Tetrahedron />,
    cube: <Cube />,
    sphere: <Sphere />,
    cone: <Cone />,
    cylinder: <Cylinder />,
    cuboid: <Cuboid />,
    torus: <Torus />,
    prizm: <Prizm />,
    ellipsoid: <Ellipsoid />,
    pyramid: <Pyramid />
}

export default function App() {
    const [activeShape, setActiveShape] = useState('cube')

    return (
        <div className={`screen`}>
            <Sidebar activeShape={activeShape} onShapeChange={setActiveShape} />
            <Canvas camera={{ position: [3, 3, 3], fov: 65 }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 2, -5]} intensity={0.3} />
                {shapeMap[activeShape]}
                <OrbitControls />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport />
                </GizmoHelper>
            </Canvas>
        </div>
    )
}