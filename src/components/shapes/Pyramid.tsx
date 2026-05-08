import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Pyramid({ radius = 1.25, height = 2.5, sides = 5, color, showBaseDiagonals, showHeight, showEdges }) {
    const geo = useMemo(() => new THREE.ConeGeometry(radius, height, sides), [radius, height, sides])
    return (
        <ShapeWrapper color={color} showHeight={showHeight} showBaseDiagonals={showBaseDiagonals} showEdges={showEdges} geometry={geo}>
            <primitive object={geo} attach="geometry" />
        </ShapeWrapper>
    )
}