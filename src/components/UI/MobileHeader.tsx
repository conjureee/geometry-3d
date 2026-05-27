import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { INSTRUCTIONS } from './HelpButton'

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
    ...INSTRUCTIONS.slice(3),
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
            {/* hamburger */}
            <button
                onClick={() => { setMenuOpen(o => !o); setHelpOpen(false) }}
                style={{
                    position: 'fixed', top: 16, left: 16, zIndex: 200,
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(13,13,28,0.9)',
                    border: '1px solid rgba(79,142,247,0.3)',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 5,
                }}
            >
                {[0,1,2].map(i => (
                    <div key={i} style={{
                        width: i === 1 ? 14 : 18,
                        height: 1.5,
                        background: 'rgba(79,142,247,0.9)',
                        borderRadius: 2,
                    }} />
                ))}
            </button>

            {/* help */}
            <button
                onClick={() => { setHelpOpen(o => !o); setMenuOpen(false) }}
                style={{
                    position: 'fixed', top: 16, right: 16, zIndex: 200,
                    width: 44, height: 44, borderRadius: 12,
                    background: helpOpen ? 'rgba(79,142,247,0.2)' : 'rgba(13,13,28,0.9)',
                    border: `1px solid ${helpOpen ? 'rgba(79,142,247,0.6)' : 'rgba(79,142,247,0.3)'}`,
                    cursor: 'pointer', color: 'rgba(79,142,247,0.9)',
                    fontSize: 18, fontFamily: 'serif', fontWeight: 500,
                    transition: 'all 0.2s',
                }}
            >
                ?
            </button>

            {/* panel help */}
            <div style={{
                position: 'fixed', top: 68, right: 16,
                width: 'min(300px, calc(100vw - 32px))',
                background: 'rgba(13,13,28,0.97)',
                border: '1px solid rgba(79,142,247,0.18)',
                borderRadius: 16, padding: '16px 18px',
                zIndex: 199,
                display: 'flex', flexDirection: 'column', gap: 12,
                opacity: helpOpen ? 1 : 0,
                transform: helpOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.97)',
                pointerEvents: helpOpen ? 'all' : 'none',
                transition: 'opacity 0.2s, transform 0.2s',
                transformOrigin: 'top right',
                backdropFilter: 'blur(12px)',
            }}>
                <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(79,142,247,0.5)' }}>
                    obsługa
                </span>
                {TOUCH_INSTRUCTIONS.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                        <span style={{ fontSize: 15, width: 22, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item.text}</span>
                    </div>
                ))}
            </div>

            {/* menu figur wyjeżdżające z lewej */}
            <div style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: 'min(300px, 85vw)',
                background: 'rgba(10,10,24,0.98)',
                borderRight: '1px solid rgba(79,142,247,0.15)',
                zIndex: 198,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex', flexDirection: 'column',
                paddingTop: 72, paddingBottom: 100,
                overflowY: 'auto',
            }}>
                <span style={{
                    fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
                    color: 'rgba(79,142,247,0.4)', padding: '0 20px 16px',
                }}>
                    wybierz figurę
                </span>

                {SHAPES.map(shape => (
                    <button
                        key={shape.id}
                        onClick={() => { onShapeChange(shape.id); setMenuOpen(false) }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 14,
                            padding: '8px 20px',
                            background: activeShape === shape.id ? 'rgba(79,142,247,0.1)' : 'transparent',
                            border: 'none',
                            borderLeft: `2px solid ${activeShape === shape.id ? 'rgba(79,142,247,0.7)' : 'transparent'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                        }}
                    >
                        <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 8, overflow: 'hidden', background: 'rgba(79,142,247,0.06)' }}>
                            <Canvas camera={{ position: [2.5, 1.8, 2.5], fov: 45 }}>
                                <ambientLight intensity={0.5} />
                                <directionalLight position={[3, 4, 3]} intensity={1.2} />
                                <SpinningShape shapeId={shape.id} />
                            </Canvas>
                        </div>
                        <span style={{
                            fontSize: 13, letterSpacing: 0.5,
                            color: activeShape === shape.id ? 'rgba(79,142,247,0.9)' : 'rgba(255,255,255,0.6)',
                        }}>
                            {shape.name}
                        </span>
                    </button>
                ))}
            </div>

            {(menuOpen || helpOpen) && (
                <div
                    onClick={() => { setMenuOpen(false); setHelpOpen(false) }}
                    style={{ position: 'fixed', inset: 0, zIndex: 197 }}
                />
            )}
        </>
    )
}