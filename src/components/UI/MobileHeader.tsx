import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import AnimationModal from './AnimationModal'
import ShapeIcon from './ShapeIcon'
import TOUCH_INSTRUCTIONS from './HelpButton'

const HAS_ANIMATION = ['cone', 'cylinder', 'sphere']

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
        cube: <boxGeometry args={[1.5, 1.5, 1.5]} />,
        cuboid: <boxGeometry args={[1.6, 0.8, 0.8]} />,
        sphere: <sphereGeometry args={[1.1, 24, 16]} />,
        cone: <coneGeometry args={[1, 1.8, 24]} />,
        cylinder: <cylinderGeometry args={[0.9, 0.9, 1.8, 24]} />,
        prism: <cylinderGeometry args={[0.9, 0.9, 1.8, 5]} />,
        pyramid: <coneGeometry args={[1, 1.8, 5]} />,
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
    const [animShape, setAnimShape] = useState(null)

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
                    <div key={shape.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <button
                            className={`mobile-shape-btn ${activeShape === shape.id ? 'active' : ''}`}
                            style={{ flex: 1 }}
                            onClick={() => { onShapeChange(shape.id); setMenuOpen(false) }}
                        >
                            <button
                                key={shape.id}
                                className={`mobile-shape-btn ${activeShape === shape.id ? 'active' : ''}`}
                                onClick={() => { onShapeChange(shape.id); setMenuOpen(false) }}
                            >
                                <div className="mobile-shape-thumb" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <ShapeIcon
                                        shapeId={shape.id}
                                        size={36}
                                        color={activeShape === shape.id ? 'rgba(79,142,247,0.9)' : 'rgba(79,142,247,0.45)'}
                                    />
                                </div>
                                <span className="mobile-shape-name">{shape.name}</span>
                            </button>
                        </button>

                        {/* przycisk play */}
                        {HAS_ANIMATION.includes(shape.id) && (
                            <button
                                onClick={e => {
                                    e.stopPropagation()
                                    setAnimShape(shape.id)
                                    setMenuOpen(false)
                                }}
                                className="anim-button"
                            >
                                <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
                                    <path d="M1 1L11 7L1 13V1Z" fill="rgba(79,142,247,0.9)" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {(menuOpen || helpOpen) && (
                <div
                    className="mobile-overlay"
                    onClick={() => { setMenuOpen(false); setHelpOpen(false) }}
                />
            )}

            {animShape && (
                <AnimationModal
                    shapeId={animShape}
                    onClose={() => setAnimShape(null)}
                />
            )}
        </>
    )
}