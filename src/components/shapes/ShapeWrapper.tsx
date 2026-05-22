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
                                         showFaceDiagonalsCount = Infinity,
                                         showBodyDiagonalsCount = Infinity,
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
                                        showFaceDiagonalsCount?: number
                                        showBodyDiagonalsCount?: number
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
        if (!showFaceDiagonals) return null;

        const yCoords = uniqueVerts.map(v => v.y);
        const minY = Math.min(...yCoords);
        const maxY = Math.max(...yCoords);

        const baseRaw = uniqueVerts.filter(v => Math.abs(v.y - minY) < 0.006);
        const topRaw  = uniqueVerts.filter(v => Math.abs(v.y - maxY) < 0.006);

        if (baseRaw.length < 3 || topRaw.length !== baseRaw.length) return null;

        const n = baseRaw.length;
        const base = sortedByAngle(baseRaw);
        const top  = sortedByAngle(topRaw);

        const used = new Set<number>();
        const matchedTop = base.map(b => {
            let bestIdx = -1;
            let minDist = Infinity;

            topRaw.forEach((t, idx) => {
                if (used.has(idx)) return;
                const d = Math.hypot(t.x - b.x, t.z - b.z);
                if (d < minDist) {
                    minDist = d;
                    bestIdx = idx;
                }
            });

            if (bestIdx !== -1) {
                used.add(bestIdx);
                return topRaw[bestIdx];
            }
            return top[base.indexOf(b)];
        });

        const pts: THREE.Vector3[] = [];
        const count = Math.min(showFaceDiagonalsCount ?? 6, 12);

        const lateralDiagonals: THREE.Vector3[][] = [];
        const baseDiagonals: THREE.Vector3[][] = [];
        const topDiagonals: THREE.Vector3[][] = [];

        for (let i = 0; i < n; i++) {
            const next = (i + 1) % n;
            lateralDiagonals.push([base[i], matchedTop[next]]);
            lateralDiagonals.push([base[next], matchedTop[i]]);
        }

        baseDiagonals.push([base[0], base[2]]);
        baseDiagonals.push([base[1], base[3]]);
        topDiagonals.push([matchedTop[0], matchedTop[2]]);
        topDiagonals.push([matchedTop[1], matchedTop[3]]);

        const allDiagonals = [
            ...lateralDiagonals.slice(0, 4),
            ...baseDiagonals,
            ...topDiagonals,
            ...lateralDiagonals.slice(4)
        ];

        for (let i = 0; i < count && i < allDiagonals.length; i++) {
            const [a, b] = allDiagonals[i];
            pts.push(a, b);
        }

        return pts.length ? new THREE.BufferGeometry().setFromPoints(pts) : null;

    }, [uniqueVerts, showFaceDiagonals, showFaceDiagonalsCount]);

    const bodyDiagonalLines = useMemo(() => {
        if (!showBodyDiagonals) return null;

        const minY = Math.min(...uniqueVerts.map(v => v.y));
        const maxY = Math.max(...uniqueVerts.map(v => v.y));

        const baseRaw = uniqueVerts.filter(v => Math.abs(v.y - minY) < 0.006);
        const topRaw  = uniqueVerts.filter(v => Math.abs(v.y - maxY) < 0.006);

        if (baseRaw.length < 3 || topRaw.length !== baseRaw.length) return null;

        const n = baseRaw.length;
        const base = sortedByAngle(baseRaw);
        const top  = sortedByAngle(topRaw);

        const pts: THREE.Vector3[] = [];
        const count = Math.min(showBodyDiagonalsCount ?? 4, 4); // maksymalnie 4

        // Generujemy dokładnie 4 unikalne przekątne bryły
        const bodyDiagonals: [THREE.Vector3, THREE.Vector3][] = [];

        if (n === 4) {
            // Standardowe 4 przekątne dla sześcianu / prostopadłościanu
            bodyDiagonals.push([base[0], top[2]]);
            bodyDiagonals.push([base[1], top[3]]);
            bodyDiagonals.push([base[2], top[0]]);
            bodyDiagonals.push([base[3], top[1]]);
        } else {
            // Dla wieloboków (np. prism z większą ilością boków)
            for (let i = 0; i < n; i++) {
                const j = (i + Math.floor(n / 2)) % n; // mniej więcej "naprzeciwko"
                bodyDiagonals.push([base[i], top[j]]);
            }
        }

        // Dodajemy tylko tyle, ile użytkownik chce (1 do 4)
        for (let i = 0; i < count; i++) {
            const [a, b] = bodyDiagonals[i];
            pts.push(a, b);
        }

        return pts.length
            ? new THREE.BufferGeometry().setFromPoints(pts)
            : null;

    }, [uniqueVerts, showBodyDiagonals, showBodyDiagonalsCount]);

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