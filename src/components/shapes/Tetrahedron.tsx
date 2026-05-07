import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Tetrahedron({
                                        radius = 1.5,
                                        color,
                                        showDiagonals,
                                        showEdges,
                                        showHeight,
                                    }) {
    const geo = useMemo(
        () => new THREE.TetrahedronGeometry(radius),
        [radius]
    )

    const heightLine = useMemo(() => {
        if (!showHeight) return null

        // tetrahedron vertices (standard geometry)
        const pos = geo.attributes.position

        const v0 = new THREE.Vector3().fromBufferAttribute(pos, 0)
        const v1 = new THREE.Vector3().fromBufferAttribute(pos, 1)
        const v2 = new THREE.Vector3().fromBufferAttribute(pos, 2)
        const v3 = new THREE.Vector3().fromBufferAttribute(pos, 3)

        // wybieramy jedną ścianę jako bazę (v1,v2,v3)
        const centroid = new THREE.Vector3()
            .add(v1)
            .add(v2)
            .add(v3)
            .divideScalar(3)

        // wierzchołek "na górze"
        const apex = v0

        const g = new THREE.BufferGeometry()
        g.setFromPoints([apex, centroid])

        return g
    }, [geo, showHeight])

    return (
        <ShapeWrapper
            color={color}
            showDiagonals={showDiagonals}
            showEdges={showEdges}
            geometry={geo}
        >
            <primitive object={geo} attach="geometry" />

            {showHeight && heightLine && (
                <line>
                    <primitive object={heightLine} attach="geometry" />
                    <lineBasicMaterial color="#50ff78" />
                </line>
            )}
        </ShapeWrapper>
    )
}