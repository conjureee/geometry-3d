import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CylinderAnimation({ progress }) {
    // progress: 0..1 skąd przychodzi z modala
    const angle = progress * Math.PI  // obrót o 180°

    const trianglePoints = [
        new THREE.Vector3(0,  1, 0),   // wierzchołek
        new THREE.Vector3(1, -1, 0),   // prawy dół
        new THREE.Vector3(-1,-1, 0),   // lewy dół (zamknięcie)
    ]

    const geoTriangle = useMemo(() => {
        const g = new THREE.BufferGeometry()
        const pts = [trianglePoints[0], trianglePoints[1], trianglePoints[2], trianglePoints[0]]
        g.setFromPoints(pts)
        return g
    }, [])

    return (
        <group rotation={[0, angle, 0]}>

            <line>
                <primitive object={geoTriangle} attach="geometry" />
                <lineBasicMaterial color="#4f8ef7" />
            </line>
            {/* stożek pojawia się jak progress > 0.8 */}
            {progress > 0.8 && (
                <mesh>
                    <coneGeometry args={[1, 2, 32]} />
                    <meshStandardMaterial color="#4f8ef7" transparent opacity={(progress - 0.8) * 5} wireframe={false} />
                </mesh>
            )}
        </group>
    )
}