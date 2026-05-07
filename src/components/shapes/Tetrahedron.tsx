import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Tetrahedron({radius = 1.5, color, showDiagonals, showEdges}) {
    const geo = useMemo(
        () => new THREE.TetrahedronGeometry(radius),
        [radius]
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