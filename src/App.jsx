import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Sidebar from './components/UI/Sidebar'
import Controls, { getDefaults, getOverlayDefaults } from './components/UI/Controls'
import ShapeInfoPanel from './components/UI/Information'
import HelpButton from './components/UI/HelpButton'
import { solids } from './components/data/solids'
import Tetrahedron from './components/shapes/Tetrahedron'
import Cube from './components/shapes/Cube'
import Sphere from './components/shapes/Sphere'
import Cone from './components/shapes/Cone'
import Cylinder from './components/shapes/Cylinder'
import Cuboid from './components/shapes/Cuboid'
import Prism from './components/shapes/Prism'
import Pyramid from './components/shapes/Pyramid'
import { useIsMobile } from './hooks/useIsMobile'
import MobileHeader from './components/UI/MobileHeader'
import BottomPanel from './components/UI/BottomPanel'


const shapeMap = {
    tetrahedron: (p) => <Tetrahedron {...p} />,
    cube: (p) => <Cube {...p} />,
    sphere: (p) => <Sphere {...p} />,
    cone: (p) => <Cone {...p} />,
    cylinder: (p) => <Cylinder {...p} />,
    cuboid: (p) => <Cuboid {...p} />,
    prism: (p) => <Prism {...p} />,
    pyramid: (p) => <Pyramid {...p} />,
}

export default function App() {
    const { isMobile } = useIsMobile()
    const [activeShape, setActiveShape] = useState('cube')
    const [params, setParams]   = useState(() => getDefaults('cube'))
    const [overlays, setOverlays] = useState(() => getOverlayDefaults('cube'))
    const [color] = useState('#FFFDEB')
    const [crossSection, setCrossSection] = useState({ enabled: false, plane: 'XY', position: 0 })

    function handleShapeChange(id) {
        setActiveShape(id)
        setParams(getDefaults(id))
        setOverlays(getOverlayDefaults(id))
        setCrossSection({ enabled: false, plane: 'XY', position: 0 })
    }

    function handleParamChange(key, value) {
        setParams(prev => ({ ...prev, [key]: value }))
    }

    function handleOverlayChange(key, value) {
        setOverlays(prev => ({ ...prev, [key]: value }))
    }

    function handleCrossSectionChange(key, value) {
        setCrossSection(prev => ({ ...prev, [key]: value }))
    }

    return (
        <div className="screen">
            {isMobile
                ? <MobileHeader activeShape={activeShape} onShapeChange={handleShapeChange} />
                : <Sidebar activeShape={activeShape} onShapeChange={handleShapeChange} />
            }

            {!isMobile && <HelpButton />}

            {!isMobile && (
                <>
                    <ShapeInfoPanel shapeData={solids[activeShape]} />
                    <Controls
                        activeShape={activeShape}
                        params={params}
                        onChange={handleParamChange}
                        overlays={overlays}
                        onOverlayChange={handleOverlayChange}
                        crossSection={crossSection}
                        onCrossSectionChange={handleCrossSectionChange}
                    />
                </>
            )}

            <Canvas camera={{ position: [3, 3, 3], fov: 65 }} gl={{ localClippingEnabled: true }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, 2, -5]} intensity={0.3} />
                {shapeMap[activeShape]?.({ ...params, color, ...overlays, crossSection })}
                <OrbitControls />
            </Canvas>

            {isMobile && (
                <BottomPanel
                    activeShape={activeShape}
                    params={params}
                    onChange={handleParamChange}
                    overlays={overlays}
                    onOverlayChange={handleOverlayChange}
                    crossSection={crossSection}
                    onCrossSectionChange={handleCrossSectionChange}
                    shapeData={solids[activeShape]}
                />
            )}
        </div>
    )
}