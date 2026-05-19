import { useMemo } from 'react'
import * as THREE from 'three'

export default function SphereAnimation({ progress, mode = 'circle' }) {
    const delay = 0.1
    const delayedProgress = progress < delay ? 0 : (progress - delay) / (1 - delay)
    const radius = 1
    const segments = 64

    const rotationAngle = delayedProgress * Math.PI * 2

    const circleGeo = useMemo(() => {
        const points = []
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2
            points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0))
        }
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [radius])

    const semicircleGeo = useMemo(() => {
        const points = []
        const offset = -Math.PI / 2
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI + offset
            points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0))
        }
        // zamknij do środka
        points.push(new THREE.Vector3(0, 0, 0))
        points.push(new THREE.Vector3(Math.cos(offset) * radius, Math.sin(offset) * radius, 0))
        return new THREE.BufferGeometry().setFromPoints(points)
    }, [radius])

    return (
        <group>
            {/* obrót całego obiektu zamiast przeliczania punktów */}
            <group rotation={[0, rotationAngle, 0]}>
                <line>
                    <primitive object={mode === 'circle' ? circleGeo : semicircleGeo} attach="geometry" />
                    <lineBasicMaterial color="rgba(79,142,247,0.75)" />
                </line>
            </group>

            {progress > 0.9 && (
                <mesh>
                    <sphereGeometry
                        args={[
                            radius, 64,
                            mode === 'circle' ? 64 : 32,
                            0,
                            mode === 'circle' ? Math.PI * 2 : Math.PI
                        ]}
                    />
                    <meshStandardMaterial
                        color="#4f8ef7"
                        transparent
                        opacity={Math.min((progress - 0.9) * 10, 1)}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            )}
        </group>
    )
}