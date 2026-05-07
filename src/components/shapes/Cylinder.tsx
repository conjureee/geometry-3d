import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cylinder({
                                     radius = 1.5,
                                     height = 3,
                                     sides = 128,
                                     color,
                                     showDiagonals,
                                     showEdges,
                                     showRadius,
                                     showHeight,
                                 }) {
    const geo = useMemo(
        () => new THREE.CylinderGeometry(radius, radius, height, sides),
        [radius, height, sides]
    )

    const radiusLine = useMemo(() => {
        if (!showRadius) return null

        const y = -height / 2

        const g = new THREE.BufferGeometry()
        g.setFromPoints([
            new THREE.Vector3(0, y, 0),
            new THREE.Vector3(radius, y, 0),
        ])
        return g
    }, [radius, height, showRadius])

    const heightLine = useMemo(() => {
        if (!showHeight) return null

        const g = new THREE.BufferGeometry()
        g.setFromPoints([
            new THREE.Vector3(0, -height / 2, 0),
            new THREE.Vector3(0, height / 2, 0),
        ])
        return g
    }, [height, showHeight])

    return (
        <ShapeWrapper
            color={color}
            showDiagonals={showDiagonals}
            showEdges={showEdges}
            geometry={geo}
        >
            <primitive object={geo} attach="geometry" />

            {showRadius && radiusLine && (
                <line>
                    <primitive object={radiusLine} attach="geometry" />
                    <lineBasicMaterial color="#ffc832" />
                </line>
            )}

            {showHeight && heightLine && (
                <line>
                    <primitive object={heightLine} attach="geometry" />
                    <lineBasicMaterial color="#50ff78" />
                </line>
            )}
        </ShapeWrapper>
    )
}