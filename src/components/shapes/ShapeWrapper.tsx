import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'

export default function ShapeWrapper({
                                         children,
                                         color = 'white',

                                         showBodyDiagonals = false,
                                         showFaceDiagonals = false,

                                         showBaseDiagonals = false,
                                         showHeight = false,

                                         showEdges = false,
                                         geometry
    }){
    const edgesGeo = useMemo(() => {
        if (!geometry || !showEdges) return null
        return new THREE.EdgesGeometry(geometry)
    }, [geometry, showEdges])

    const bodyDiagonalLines = useMemo(() => {
        if (!geometry || !showBodyDiagonals) return null

        const pos = geometry.attributes.position
        const vertices = []

        for (let i = 0; i < pos.count; i++) {
            vertices.push(
                new THREE.Vector3(
                    pos.getX(i),
                    pos.getY(i),
                    pos.getZ(i)
                )
            )
        }

        const unique = []
        vertices.forEach(v => {
            const exists = unique.some(u => u.distanceTo(v) < 0.001)
            if (!exists) unique.push(v)
        })

        if (unique.length < 8) return null

        const lines = [
            unique[0], unique[6],
            unique[1], unique[7],
            unique[2], unique[4],
            unique[3], unique[5],
        ]

        return new THREE.BufferGeometry().setFromPoints(lines)
    }, [geometry, showBodyDiagonals])

    const faceDiagonalLines = useMemo(() => {
        if (!geometry || !showFaceDiagonals) return null

        const pos = geometry.attributes.position
        const vertices = []

        for (let i = 0; i < pos.count; i++) {
            vertices.push(
                new THREE.Vector3(
                    pos.getX(i),
                    pos.getY(i),
                    pos.getZ(i)
                )
            )
        }

        const unique = []
        vertices.forEach(v => {
            const exists = unique.some(u => u.distanceTo(v) < 0.001)
            if (!exists) unique.push(v)
        })

        if (unique.length < 8) return null

        const lines = [

            unique[0], unique[3],
            unique[1], unique[2],

            unique[4], unique[7],
            unique[5], unique[6],

            unique[3], unique[7],
            unique[2], unique[6],

            unique[0], unique[4],
            unique[1], unique[5],

            unique[3], unique[4],
            unique[1], unique[6],

            unique[2], unique[5],
            unique[7], unique[0],

        ]

        return new THREE.BufferGeometry().setFromPoints(lines)
    }, [geometry, showFaceDiagonals])

    const heightLine = useMemo(() => {
        if (!geometry || !showHeight) return null

        const pos = geometry.attributes.position

        let minY = Infinity
        let maxY = -Infinity

        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)

            if (y < minY) minY = y
            if (y > maxY) maxY = y
        }

        const points = [
            new THREE.Vector3(0, minY, 0),
            new THREE.Vector3(0, maxY, 0),
        ]

        return new THREE.BufferGeometry().setFromPoints(points)

    }, [geometry, showHeight])

    const baseDiagonalLines = useMemo(() => {
        if (!geometry || !showBaseDiagonals) return null

        const pos = geometry.attributes.position

        const baseVerts = []

        // ConeGeometry: pierwsze (sides + 1) punktów = podstawa
        const sides = pos.count - (pos.count - pos.count % (pos.count - 1)) // fallback safe

        // lepsze podejście: bierzemy pierwszy pierścień
        const ringSize = Math.round(Math.sqrt(pos.count)) // fallback praktyczny

        for (let i = 0; i < pos.count; i++) {
            const v = new THREE.Vector3(
                pos.getX(i),
                pos.getY(i),
                pos.getZ(i)
            )

            baseVerts.push(v)
        }

        // znajdź minimalne Y (podstawa stożka)
        let minY = Infinity
        baseVerts.forEach(v => {
            if (v.y < minY) minY = v.y
        })

        const base = baseVerts.filter(v => Math.abs(v.y - minY) < 0.001)

        const n = base.length
        if (n < 4) return null

        // centrum podstawy
        const center = new THREE.Vector3()
        base.forEach(v => center.add(v))
        center.divideScalar(n)

        // sort wokół środka (ważne!)
        base.sort((a, b) =>
            Math.atan2(a.z - center.z, a.x - center.x) -
            Math.atan2(b.z - center.z, b.x - center.x)
        )

        const points = []

        // pełne przekątne wielokąta (bez boków)
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {

                const adjacent =
                    j === i + 1 ||
                    (i === 0 && j === n - 1)

                if (!adjacent) {
                    points.push(base[i], base[j])
                }
            }
        }

        return new THREE.BufferGeometry().setFromPoints(points)

    }, [geometry, showBaseDiagonals])

    return (
        <group>
            <mesh>
                {children}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.2}
                    transparent={true}
                    opacity={0.25}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {showFaceDiagonals && faceDiagonalLines && (
                <lineSegments geometry={faceDiagonalLines}>
                    <lineBasicMaterial color="#ffaa33" />
                </lineSegments>
            )}

            {showBodyDiagonals && bodyDiagonalLines && (
                <lineSegments geometry={bodyDiagonalLines}>
                    <lineBasicMaterial color="#C00707" />
                </lineSegments>
            )}

            {showHeight && heightLine && (
                <lineSegments geometry={heightLine}>
                    <lineBasicMaterial
                        color="#55ff88"
                        depthTest={false}
                    />
                </lineSegments>
            )}

            {showBaseDiagonals && baseDiagonalLines && (
                <lineSegments geometry={baseDiagonalLines}>
                    <lineBasicMaterial
                        color="#ff5555"
                        depthTest={false}
                    />
                </lineSegments>
            )}

            {showEdges && edgesGeo && (
                <lineSegments geometry={edgesGeo} renderOrder={2}>
                    <lineBasicMaterial
                        color={color}
                        linewidth={1}
                        depthTest={false}
                    />
                </lineSegments>
            )}
        </group>
    )
}