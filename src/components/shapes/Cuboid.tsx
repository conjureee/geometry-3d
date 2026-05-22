import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cuboid({width = 2, height = 2, depth = 2, color, showFaceDiagonals, showBodyDiagonals, showFaceDiagonalsCount, showBodyDiagonalsCount, showEdges}) {
    const geo = useMemo(() => new THREE.BoxGeometry(width, height, depth), [width, height, depth])
    return (
        <ShapeWrapper
            color={color}
            showEdges={showEdges}
            showFaceDiagonals={showFaceDiagonals}
            showBodyDiagonals={showBodyDiagonals}
            showFaceDiagonalsCount={showFaceDiagonalsCount}
            showBodyDiagonalsCount={showBodyDiagonalsCount}
            geometry={geo}
        />
    )
}
