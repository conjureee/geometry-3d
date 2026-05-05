import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SHAPES = [
    { id: 'tetrahedron', name: 'Czworościan' },
    { id: 'cube', name: 'Sześcian' },
    { id: 'sphere', name: 'Kula' },
    { id: 'cone', name: 'Stożek' },
    { id: 'cylinder', name: 'Walec' },
]

function SpinningShape({ shapeId }) {
    const ref = useRef<THREE.Mesh>(null!)
    useFrame(() => { if (ref.current) ref.current.rotation.y += 0.018 })

    const geo = {
        tetrahedron: <tetrahedronGeometry args={[1.1]} />,
        cube: <boxGeometry args={[1.6, 1.6, 1.6]} />,
        sphere: <sphereGeometry args={[1.1, 24, 16]} />,
        cone: <coneGeometry args={[1, 1.8, 24]} />,
        cylinder: <cylinderGeometry args={[0.9, 0.9, 1.8, 24]} />,
    }

    return (
        <mesh ref={ref} rotation={[0.3, 0, 0]}>
            {geo[shapeId]}
            <meshStandardMaterial color="#4f8ef7" roughness={0.3} metalness={0.2} />
        </mesh>
    )
}

function ShapeCard({ shape, onClick }) {
    return (
        <div onClick={onClick} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 8, cursor: 'pointer', padding: 10, borderRadius: 12,
            border: '1px solid rgba(79,142,247,0.15)',
            background: 'rgba(79,142,247,0.04)',
            transition: 'all 0.2s',
        }}
             onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
            <div style={{ width: 72, height: 72, borderRadius: 8, overflow: 'hidden', background: 'rgba(79,142,247,0.06)' }}>
                <Canvas camera={{ position: [2.5, 1.8, 2.5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[3, 4, 3]} intensity={1.2} />
                    <SpinningShape shapeId={shape.id} />
                </Canvas>
            </div>
            <span style={{ fontSize: 10, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase' }}>
        {shape.name}
      </span>
        </div>
    )
}

export default function Sidebar({ activeShape, onShapeChange }) {
    const [open, setOpen] = useState(false)
    const visible = SHAPES.filter(s => s.id !== activeShape)

    return (
        <>
            <div
                onMouseEnter={() => setOpen(true)}
                style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 48, zIndex: 100 }}
            />

            <div
                onClick={() => setOpen(o => !o)}
                style={{
                    position: 'fixed', top: 12, left: '50%', transform: 'translateX(-50%)',
                    width: 44, height: 28, background: 'rgba(79,142,247,0.15)',
                    border: '1px solid rgba(79,142,247,0.35)', borderRadius: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', zIndex: 101, transition: 'background 0.2s',
                }}
            >
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none"
                     style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.35s ease' }}>
                    <path d="M1 1L7 7L13 1" stroke="rgba(79,142,247,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            <div style={{
                position: 'fixed', top: 0, left: '50%',
                transform: `translateX(-50%) translateY(${open ? '0' : '-100%'})`,
                background: 'rgba(13,13,28,0.97)',
                border: '1px solid rgba(79,142,247,0.18)', borderTop: 'none',
                borderRadius: '0 0 20px 20px', padding: '16px 20px 20px',
                zIndex: 99, transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                backdropFilter: 'blur(12px)', minWidth: 420, paddingTop: '50px'
            }}>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    {visible.map(shape => (
                        <ShapeCard key={shape.id} shape={shape} onClick={() => { onShapeChange(shape.id); setOpen(false) }} />
                    ))}
                </div>
            </div>

            {open && (
                <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98 }} />
            )}
        </>
    )
}