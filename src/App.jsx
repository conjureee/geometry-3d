import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei'
import Sidebar from './components/UI/Sidebar'
import Controls, { getDefaults } from './components/UI/Controls'
import Tetrahedron from './components/shapes/Tetrahedron'
import Cube from './components/shapes/Cube'
import Sphere from './components/shapes/Sphere'
import Cone from './components/shapes/Cone'
import Cylinder from './components/shapes/Cylinder'
import Cuboid from './components/shapes/Cuboid'
import Prizm from './components/shapes/Prizm'
import Pyramid from './components/shapes/Pyramid'

const shapeMap = {
    tetrahedron: (p) => <Tetrahedron {...p} />,
    cube:        (p) => <Cube {...p} />,
    sphere:      (p) => <Sphere {...p} />,
    cone:        (p) => <Cone {...p} />,
    cylinder:    (p) => <Cylinder {...p} />,
    cuboid:      (p) => <Cuboid {...p} />,
    prizm:       (p) => <Prizm {...p} />,
    pyramid:       (p) => <Pyramid {...p} />,
}

export default function App() {
    const [activeShape, setActiveShape] = useState('cube')
    const [params, setParams] = useState(() => getDefaults('cube'))
    const [color, setColor] = useState('orange')

    function handleShapeChange(id) {
        setActiveShape(id)
        setParams(getDefaults(id))
    }

    function handleParamChange(key, value) {
        setParams(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="screen">
            <Sidebar activeShape={activeShape} onShapeChange={handleShapeChange} />
            <Controls activeShape={activeShape} params={params} onChange={handleParamChange} />
            <Canvas camera={{ position: [3, 3, 3], fov: 65 }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 2, -5]} intensity={0.3} />
                {shapeMap[activeShape]?.({ ...params, color })}
                <OrbitControls />
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport />
                </GizmoHelper>
            </Canvas>
        </div>
    )
}