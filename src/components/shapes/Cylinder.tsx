import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cylinder({radius = 1.5, height = 3, sides = 128, color, showDiagonals, showEdges}) {
    const geo = useMemo(
        () => new THREE.CylinderGeometry(radius, radius, height, sides),
        [radius, height, sides]
    )

    return (
        <ShapeWrapper
            color={color}
            showDiagonals={showDiagonals}
            showEdges={showEdges}
            geometry={geo}
        >
            <primitive object={geo} attach="geometry" />
        </ShapeWrapper>
    )
}