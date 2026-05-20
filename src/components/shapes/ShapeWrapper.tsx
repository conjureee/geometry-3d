import { Canvas } from '@react-three/fiber'
import {use, useMemo} from 'react'
import * as THREE from 'three'

export default function ShapeWrapper({
                                         children,
                                         color = 'white',
                                         showEdges = false,
                                         showFaceDiagonals = false,
                                         showBodyDiagonals = false,
                                         showBaseDiagonals = false,
                                         showHeight = false,
                                         showInclined = false,
                                         geometry,
                                     }: {
                                        children?: React.ReactNode
                                        color?: string
                                        showEdges?: boolean
                                        showFaceDiagonals?: boolean
                                        showBodyDiagonals?: boolean
                                        showBaseDiagonals?: boolean
                                        showHeight?: boolean
                                        showInclined?: boolean
                                        geometry?: THREE.BufferGeometry
                                    }) {

    if (!geometry) return <>{children}</>

    const inclinedGeometry = useMemo(() => {
        if (!showInclined) return geometry

        const cloned = geometry.clone()
        const pos = cloned.attributes.position

        let maxY = -Infinity

        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)
            if (y > maxY) maxY = y
        }

        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)

            if (Math.abs(y - maxY) < 0.001) {
                pos.setX(i, pos.getX(i) + 0.8)
            }
        }

        pos.needsUpdate = true
        cloned.computeVertexNormals()

        return cloned
    }, [geometry, showInclined])

    const edgesGeo = useMemo(
        () => showEdges
            ? new THREE.EdgesGeometry(inclinedGeometry)
            : null,
        [inclinedGeometry, showEdges]
    )

    const uniqueVerts = useMemo(() => {
        const pos = geometry.attributes.position
        const verts: THREE.Vector3[] = []
        for (let i = 0; i < pos.count; i++) {
            verts.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)))
        }
        const unique: THREE.Vector3[] = []
        verts.forEach(v => {
            if (!unique.some(u => u.distanceTo(v) < 0.001)) unique.push(v)
        })
        return unique
    }, [geometry])

    const sortedByAngle = (verts: THREE.Vector3[]) => {
        const center = new THREE.Vector3()
        verts.forEach(v => center.add(v))
        center.divideScalar(verts.length)
        return [...verts].sort((a, b) =>
            Math.atan2(a.z - center.z, a.x - center.x) -
            Math.atan2(b.z - center.z, b.x - center.x)
        )
    }

    const baseDiagonalLines = useMemo(() => {
        if (!showBaseDiagonals) return null

        const minY = Math.min(...uniqueVerts.map(v => v.y))

        const rawBase = uniqueVerts.filter(
            v => Math.abs(v.y - minY) < 0.001
        )

        const base = sortedByAngle(
            rawBase.filter(v => {
                const dist = Math.sqrt(v.x * v.x + v.z * v.z)
                return dist > 0.001
            })
        )

        const n = base.length

        if (n < 4) return null

        const pts: THREE.Vector3[] = []

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {

                const adjacent =
                    j === i + 1 ||
                    (i === 0 && j === n - 1)

                if (adjacent) continue

                pts.push(base[i], base[j])
            }
        }

        return pts.length ? new THREE.BufferGeometry().setFromPoints(pts) : null

    }, [uniqueVerts, showBaseDiagonals])

    const faceDiagonalLines = useMemo(() => {
        if (!showFaceDiagonals) return null

        const minY = Math.min(...uniqueVerts.map(v => v.y))
        const maxY = Math.max(...uniqueVerts.map(v => v.y))

        const base = sortedByAngle(uniqueVerts.filter(v => Math.abs(v.y - minY) < 0.001))
        const rawTop = uniqueVerts.filter(v => Math.abs(v.y - maxY) < 0.001)
        const n = base.length

        if (n < 3 || rawTop.length !== n) return null

        const top = base.map(b => {
            let closest = rawTop[0]
            let minDist = Infinity
            rawTop.forEach(t => {
                const d = Math.hypot(t.x - b.x, t.z - b.z)
                if (d < minDist) { minDist = d; closest = t }
            })
            return closest
        })

        const pts: THREE.Vector3[] = []

        for (let i = 0; i < n; i++) {
            const next = (i + 1) % n
            pts.push(base[i], top[next])
            pts.push(base[next], top[i])
        }

        return pts.length ? new THREE.BufferGeometry().setFromPoints(pts) : null

    }, [uniqueVerts, showFaceDiagonals])

    const bodyDiagonalLines = useMemo(() => {
        if (!showBodyDiagonals) return null

        const minY = Math.min(...uniqueVerts.map(v => v.y))
        const maxY = Math.max(...uniqueVerts.map(v => v.y))

        const base = sortedByAngle(
            uniqueVerts.filter(v => Math.abs(v.y - minY) < 0.001)
        )

        const top = sortedByAngle(
            uniqueVerts.filter(v => Math.abs(v.y - maxY) < 0.001)
        )

        const n = base.length

        if (top.length !== n || n < 4) return null

        const pts: THREE.Vector3[] = []

        for (let i = 0; i < n; i++) {

            for (let offset = 2; offset <= n - 2; offset++) {

                const j = (i + offset) % n

                pts.push(base[i], top[j])
            }
        }

        return pts.length
            ? new THREE.BufferGeometry().setFromPoints(pts)
            : null

    }, [uniqueVerts, showBodyDiagonals])

    const heightLine = useMemo(() => {
        if (!showHeight) return null
        const pos = geometry.attributes.position
        let minY = Infinity, maxY = -Infinity
        for (let i = 0; i < pos.count; i++) {
            const y = pos.getY(i)
            if (y < minY) minY = y
            if (y > maxY) maxY = y
        }
        return new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0, minY, 0),
            new THREE.Vector3(0, maxY, 0)
        ])
    }, [geometry, showHeight])

    return (
        <group>
            <mesh geometry={inclinedGeometry}>
                {children}
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.2}
                    transparent
                    opacity={0.25}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {showEdges && edgesGeo && <lineSegments geometry={edgesGeo}><lineBasicMaterial color={color} /></lineSegments>}
            {showFaceDiagonals && faceDiagonalLines && <lineSegments geometry={faceDiagonalLines}><lineBasicMaterial color="#ffaa33" /></lineSegments>}
            {showBodyDiagonals && bodyDiagonalLines && <lineSegments geometry={bodyDiagonalLines}><lineBasicMaterial color="#C00707" /></lineSegments>}
            {showHeight && heightLine && <lineSegments geometry={heightLine}><lineBasicMaterial color="#55ff88" /></lineSegments>}
            {showBaseDiagonals && baseDiagonalLines && <lineSegments geometry={baseDiagonalLines}><lineBasicMaterial color="#ff5555" /></lineSegments>}
        </group>
    )
}