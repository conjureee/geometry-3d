import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Tetrahedron({
                                        radius = 1.5,
                                        color,
                                        showEdges,
                                        showHeight,
                                        showFaceHeights,
                                        showFaceHeightsCount,
                                    }) {
    const geo = useMemo(
        () => new THREE.TetrahedronGeometry(radius),
        [radius]
    )

    // === WYSOKOŚĆ BRYŁY (już miałeś) ===
    const heightLine = useMemo(() => {
        if (!showHeight) return null

        const pos = geo.attributes.position

        const v0 = new THREE.Vector3().fromBufferAttribute(pos, 0)
        const v1 = new THREE.Vector3().fromBufferAttribute(pos, 1)
        const v2 = new THREE.Vector3().fromBufferAttribute(pos, 2)
        const v3 = new THREE.Vector3().fromBufferAttribute(pos, 3)

        const centroid = new THREE.Vector3()
            .add(v1)
            .add(v2)
            .add(v3)
            .divideScalar(3)

        const apex = v0

        const g = new THREE.BufferGeometry()
        g.setFromPoints([apex, centroid])

        return g
    }, [geo, showHeight])

    // === NOWE: WYSOKOŚCI ŚCIAN TETRAHEDRONA ===
    const faceHeightLines = useMemo(() => {
        if (!showFaceHeights) return null
        if (geo.attributes.position.count !== 12) return null // 4 wierzchołki × 3

        const pos = geo.attributes.position
        const verts = [
            new THREE.Vector3().fromBufferAttribute(pos, 0),
            new THREE.Vector3().fromBufferAttribute(pos, 1),
            new THREE.Vector3().fromBufferAttribute(pos, 2),
            new THREE.Vector3().fromBufferAttribute(pos, 3),
        ]

        const pts: THREE.Vector3[] = []
        const count = Math.min(showFaceHeightsCount ?? 4, 4)

        // Wszystkie 4 ściany
        const faces = [
            [verts[0], verts[1], verts[2]], // ABC
            [verts[0], verts[1], verts[3]], // ABD
            [verts[0], verts[2], verts[3]], // ACD
            [verts[1], verts[2], verts[3]], // BCD
        ]

        for (let i = 0; i < count; i++) {
            const [a, b, c] = faces[i]
            const mid = new THREE.Vector3().addVectors(b, c).multiplyScalar(0.5)
            pts.push(a, mid)
        }

        return pts.length
            ? new THREE.BufferGeometry().setFromPoints(pts)
            : null
    }, [geo, showFaceHeights, showFaceHeightsCount])

    return (
        <ShapeWrapper
            color={color}
            showEdges={showEdges}
            geometry={geo}
        >
            <primitive object={geo} attach="geometry" />

            {/* Wysokość bryły */}
            {showHeight && heightLine && (
                <line>
                    <primitive object={heightLine} attach="geometry" />
                    <lineBasicMaterial color="#50ff78" />
                </line>
            )}

            {/* Wysokości ścian */}
            {faceHeightLines && (
                <lineSegments geometry={faceHeightLines}>
                    <lineBasicMaterial
                        color="#64c8ff"
                        transparent
                        opacity={0.9}
                        linewidth={2.8}
                    />
                </lineSegments>
            )}
        </ShapeWrapper>
    )
}