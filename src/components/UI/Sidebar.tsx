import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SHAPES = [
    { id: 'tetrahedron', name: 'Czworościan' },
    { id: 'cube', name: 'Sześcian' },
    { id: 'cuboid', name: 'Prostopadłościan' },
    { id: 'sphere', name: 'Kula' },
    { id: 'cone', name: 'Stożek' },
    { id: 'cylinder', name: 'Walec' },
    { id: 'prizm', name: 'Graniastosłup' },
    { id: 'pyramid', name: 'Ostrosłup' },
]

function SpinningShape({ shapeId }) {
    const ref = useRef<THREE.Mesh>(null!)
    useFrame(() => { if (ref.current) {
        ref.current.rotation.y += 0.01
        ref.current.rotation.x += 0.003
        ref.current.rotation.z += 0.004
    } })

    const geo = {
        tetrahedron: <tetrahedronGeometry args={[1.1]} />,
        cube: <boxGeometry args={[1.6, 1.6, 1.6]} />,
        sphere: <sphereGeometry args={[1.1, 24, 16]} />,
        cone: <coneGeometry args={[1, 1.8, 24]} />,
        cylinder: <cylinderGeometry args={[0.9, 0.9, 1.8, 24]} />,
        cuboid: <boxGeometry args={[1.6, 0.75, 0.75]} />,
        prizm: <cylinderGeometry args={[0.9, 0.9, 1.8, 5]} />,
        pyramid: <coneGeometry args={[1, 1.8, 5]} />,
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
        <div onClick={onClick} className={`figure-card`}
             onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
             onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(79,142,247,0.15)'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
            <div className={`figure-background`}>
                <Canvas camera={{ position: [2.5, 1.8, 2.5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[3, 4, 3]} intensity={1.2} />
                    <SpinningShape shapeId={shape.id} />
                </Canvas>
            </div>
            <span className={`figure-name`}>
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
            <div onMouseEnter={() => setOpen(true)} className={`sidebar`}/>

            <div onClick={() => setOpen(o => !o)} className={`menu-arrow-box`}>
                <svg
                    className={`menu-arrow ${open ? 'open' : ''}`}
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                >
                    <path d="M1 1L7 7L13 1" stroke="rgba(79,142,247,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            <div className={`figure-card-box ${open ? 'open' : ''}`}>
                <div className={`figure-cards`}>
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