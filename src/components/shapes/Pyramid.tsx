import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Pyramid({
                                    radius = 1.25,
                                    height = 2.5,
                                    sides = 5,
                                    color,
                                    showBaseDiagonals,
                                    showHeight,
                                    showEdges,
                                    showInclined,
                                }) {
    const geo = useMemo(
        () => new THREE.ConeGeometry(radius, height, sides, 1),
        [radius, height, sides]
    )

    const inclinedGeometry = useMemo(() => {
        if (!showInclined) return null
        const cloned = geo.clone()
        const pos = cloned.attributes.position
        let minY = Infinity, maxY = -Infinity
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)
            if (y < minY) minY = y
            if (y > maxY) maxY = y
        }
        const totalHeight = maxY - minY
        for (let i = 0; i < pos.count; i++) {
            const t = (pos.getY(i) - minY) / totalHeight
            pos.setX(i, pos.getX(i) + t * (radius * 1.4))
        }
        pos.needsUpdate = true
        cloned.computeVertexNormals()
        return cloned
    }, [geo, showInclined, radius])

    const heightLineGeo = useMemo(() => {
        if (!showHeight) return null
        const currentGeo = inclinedGeometry ?? geo
        const pos = currentGeo.attributes.position
        let minY = Infinity, maxY = -Infinity
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)
            if (y < minY) minY = y
            if (y > maxY) maxY = y
        }
        let apex = new THREE.Vector3()
        for (let i = 0; i < pos.count; i++) {
            if (Math.abs(pos.getY(i) - maxY) < 0.001) {
                apex.set(pos.getX(i), maxY, pos.getZ(i))
                break
            }
        }
        if (showInclined) {
            return new THREE.BufferGeometry().setFromPoints([
                apex,
                new THREE.Vector3(apex.x, minY, apex.z)
            ])
        }

        return new THREE.BufferGeometry().setFromPoints([
            apex,
            new THREE.Vector3(0, minY, 0)
        ])
    }, [geo, inclinedGeometry, showHeight, showInclined])

    const currentGeometry = inclinedGeometry ?? geo

    return (
        <group>
            <ShapeWrapper
                color={color}
                showEdges={showEdges}
                showBaseDiagonals={showBaseDiagonals}
                geometry={currentGeometry}
            />

            {showHeight && heightLineGeo && (
                <lineSegments geometry={heightLineGeo}>
                    <lineBasicMaterial color="#55ff88" />
                </lineSegments>
            )}
        </group>
    )
}