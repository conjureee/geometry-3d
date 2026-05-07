import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Prizm({ height = 2.5, sides = 5, color, showDiagonals, showEdges }) {
    const geo = useMemo(() => new THREE.CylinderGeometry(1.2, 1.2, height, sides), [height, sides])
    return (
        <ShapeWrapper color={color} showDiagonals={showDiagonals} showEdges={showEdges} geometry={geo}>
            <primitive object={geo} attach="geometry" />
        </ShapeWrapper>
    )
}