import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function ShapeWrapper({ children, color = 'white', showDiagonals = false, showEdges = false, geometry }) {
    const edgesGeo = useMemo(() => {
        if (!geometry || !showEdges) return null
        return new THREE.EdgesGeometry(geometry)
    }, [geometry, showEdges])

    const diagonalLines = useMemo(() => {
        if (!geometry || !showDiagonals) return null
        const pos = geometry.attributes.position
        const vertices = []
        for (let i = 0; i < pos.count; i++) {
            vertices.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)))
        }

        const unique = []
        vertices.forEach(v => {
            const exists = unique.some(u => u.distanceTo(v) < 0.001)

            if (!exists) {
                unique.push(v)
            }
        })

        const lines = []
        for (let i = 0; i < unique.length; i++) {
            for (let j = i + 1; j < unique.length; j++) {
                lines.push(unique[i], unique[j])
            }
        }
        const geo = new THREE.BufferGeometry().setFromPoints(lines)
        return geo
    }, [geometry, showDiagonals])

    return (
        <group>
            <mesh>
                {children}
                <meshStandardMaterial
                    color={color}
                    transparent={true}
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {showEdges && edgesGeo && (
                <lineSegments geometry={edgesGeo}>
                    <lineBasicMaterial color={color} linewidth={1} />
                </lineSegments>
            )}

            {showDiagonals && diagonalLines && (
                <lineSegments geometry={diagonalLines}>
                    <lineBasicMaterial color="#ff4444" linewidth={1} />
                </lineSegments>
            )}
        </group>
    )
}