import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ConeAnimation({ progress }) {

    const delay = 0.1

    const delayedProgress =
        progress < delay
            ? 0
            : (progress - delay) / (1 - delay)

    const angle = delayedProgress * Math.PI * 2

    const trianglePoints = [
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(1, -1, 0),
    ]

    const geoTriangle = useMemo(() => {

        const g = new THREE.BufferGeometry()

        const pts = [
            trianglePoints[0],
            trianglePoints[1],
            trianglePoints[2],
            trianglePoints[0],
        ]

        g.setFromPoints(pts)

        return g

    }, [])

    return (
        <group rotation={[0, angle, 0]}>

            <line>
                <primitive object={geoTriangle} attach="geometry" />
                <lineBasicMaterial color="rgba(79, 142, 247, 0.75)" />
            </line>

            {progress > 0.8 && (
                <mesh>

                    <coneGeometry args={[1, 2, 64]} />

                    <meshStandardMaterial
                        color="#4f8ef7"
                        transparent
                        opacity={(progress - 0.8) * 5}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}

        </group>
    )
}
