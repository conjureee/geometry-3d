import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cube({size = 2, color, showFaceDiagonals, showBodyDiagonals, showEdges}) {
    const geo = useMemo(
        () => new THREE.BoxGeometry(size, size, size),
        [size]
    )

    return (
        <ShapeWrapper
            color={color}
            showFaceDiagonals={showFaceDiagonals}
            showBodyDiagonals={showBodyDiagonals}
            showEdges={showEdges}
            geometry={geo}
        >
            <primitive object={geo} attach="geometry" />
        </ShapeWrapper>
    )
}