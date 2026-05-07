import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cone({radius = 1.5, height = 2.75, sides = 64, color, showDiagonals, showEdges}) {
    const geo = useMemo(
        () => new THREE.ConeGeometry(radius, height, sides),
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