import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Sphere({radius = 1.5, widthSegments = 32, heightSegments = 32, color, showDiagonals, showEdges}) {
    const geo = useMemo(
        () => new THREE.SphereGeometry(radius, widthSegments, heightSegments),
        [radius, widthSegments, heightSegments]
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