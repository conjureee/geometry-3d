import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const SHAPES = [
    { id: 'tetrahedron', name: 'Czworościan' },
    { id: 'cube',        name: 'Sześcian' },
    { id: 'cuboid',      name: 'Prostopadłościan' },
    { id: 'sphere',      name: 'Kula' },
    { id: 'cone',        name: 'Stożek' },
    { id: 'cylinder',    name: 'Walec' },
    { id: 'prism',       name: 'Graniastosłup' },
    { id: 'pyramid',     name: 'Ostrosłup' },
]

const TOUCH_INSTRUCTIONS = [
    { icon: '👆', text: 'Jeden palec + przeciągnij → obróć figurę' },
    { icon: '🤏', text: 'Dwa palce → przybliż / oddal' },
    { icon: '✌️', text: 'Dwa palce + przeciągnij → przesuń widok' },
    { icon: '🍔', text: 'Hamburger po lewo na górze -> menu do zmiany brył' },
    { icon: '🎬', text: 'Kliknięcie w miniaturę bryły -> animacja powstawania' },
    { icon: '💡', text: 'Panel Informacje -> informacje o bryle (m.in. opis, wzory, ciekawostki)' },
    { icon: '🎛️', text: 'Panel Parametry -> parametry, nakładki i przekroje brył' },
]

function SpinningShape({ shapeId }) {
    const ref = useRef(null)
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.012
            ref.current.rotation.x += 0.003
        }
    })
    const geo = {
        tetrahedron: <tetrahedronGeometry args={[1.1]} />,
        cube:        <boxGeometry args={[1.5, 1.5, 1.5]} />,
        cuboid:      <boxGeometry args={[1.6, 0.8, 0.8]} />,
        sphere:      <sphereGeometry args={[1.1, 24, 16]} />,
        cone:        <coneGeometry args={[1, 1.8, 24]} />,
        cylinder:    <cylinderGeometry args={[0.9, 0.9, 1.8, 24]} />,
        prism:       <cylinderGeometry args={[0.9, 0.9, 1.8, 5]} />,
        pyramid:     <coneGeometry args={[1, 1.8, 5]} />,
    }
    return (
        <mesh ref={ref}>
            {geo[shapeId]}
            <meshStandardMaterial color="#4f8ef7" roughness={0.3} metalness={0.2} />
        </mesh>
    )
}

export default function MobileHeader({ activeShape, onShapeChange }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [helpOpen, setHelpOpen] = useState(false)

    return (
        <>
            <button
                className="mobile-btn mobile-btn-left"
                onClick={() => { setMenuOpen(o => !o); setHelpOpen(false) }}
            >
                {[0,1,2].map(i => (
                    <div key={i} className="hamburger-line" style={{ width: i === 1 ? 14 : 18 }} />
                ))}
            </button>

            <button
                className={`mobile-btn mobile-btn-right ${helpOpen ? 'active' : ''}`}
                onClick={() => { setHelpOpen(o => !o); setMenuOpen(false) }}
            >
                ?
            </button>

            <div className={`mobile-help-panel ${helpOpen ? 'open' : 'closed'}`}>
                <span className="mobile-help-title">obsługa</span>
                {TOUCH_INSTRUCTIONS.map((item, i) => (
                    <div key={i} className="mobile-help-item">
                        <span className="mobile-help-icon">{item.icon}</span>
                        <span className="mobile-help-text">{item.text}</span>
                    </div>
                ))}
            </div>

            <div className={`mobile-shape-drawer ${menuOpen ? 'open' : 'closed'}`}>
                <span className="mobile-drawer-label">wybierz figurę</span>
                {SHAPES.map(shape => (
                    <button
                        key={shape.id}
                        className={`mobile-shape-btn ${activeShape === shape.id ? 'active' : ''}`}
                        onClick={() => { onShapeChange(shape.id); setMenuOpen(false) }}
                    >
                        <div className="mobile-shape-thumb">
                            <Canvas camera={{ position: [2.5, 1.8, 2.5], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[3, 4, 3]} intensity={1.2} />
                                <SpinningShape shapeId={shape.id} />
                            </Canvas>
                        </div>
                        <span className="mobile-shape-name">{shape.name}</span>
                    </button>
                ))}
            </div>

            {(menuOpen || helpOpen) && (
                <div
                    className="mobile-overlay"
                    onClick={() => { setMenuOpen(false); setHelpOpen(false) }}
                />
            )}
        </>
    )
}