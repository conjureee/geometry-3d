import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cube({ size = 1.6, color, showEdges, showFaceDiagonals, showBodyDiagonals, showFaceDiagonalsCount, showBodyDiagonalsCount }) {
    const geo = useMemo(() => new THREE.BoxGeometry(size, size, size), [size])
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
