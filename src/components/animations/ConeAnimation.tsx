import { useMemo } from 'react'
import * as THREE from 'three'

export default function ConeAnimation({progress, mode = 'short', }) {

    const delay = 0.1

    const delayedProgress =
        progress < delay
            ? 0
            : (progress - delay) / (1 - delay)

    const angle = delayedProgress * Math.PI * 2

    const isLong = mode === 'long'

    const width = isLong ? 2 : 1.5
    const height = isLong ? 1.5 : 2

    const rectanglePoints = [
        new THREE.Vector3(0, height / 2, 0),
        new THREE.Vector3(width, -height / 2, 0),
        new THREE.Vector3(0, -height / 2, 0),
        new THREE.Vector3(0, height / 2, 0),
    ]

    const geoRectangle = useMemo(() => {
        const g = new THREE.BufferGeometry()
        g.setFromPoints(rectanglePoints)
        return g
    }, [mode])

    return (
        <group rotation={[0, angle, 0]}>

            <line>
                <primitive object={geoRectangle} attach="geometry" />
                <lineBasicMaterial color="rgba(79, 142, 247, 0.75)" />
            </line>

            {progress > 0.8 && (
                <mesh>
                    <coneGeometry
                        args={[
                            width,
                            height,
                            64
                        ]}
                    />

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