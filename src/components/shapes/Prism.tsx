import * as THREE from 'three'
import { useMemo } from 'react'
import ShapeWrapper from './ShapeWrapper'

export default function Prism({
                                  radius = 1,
                                  height = 2.5,
                                  sides = 5,
                                  color,
                                  crossSection,
                                  showEdges,
                                  showBaseDiagonals,
                                  showInclined
                                  // showFaceDiagonals,
                                  // showBodyDiagonals,
                                  // showFaceDiagonalsCount,
                              }){
    const geo = useMemo(
        () => new THREE.CylinderGeometry(radius, radius, height, sides),
        [radius, height, sides]
    )

    const vertices = useMemo(() => {
        const pts = []

        for (let i = 0; i < sides; i++) {
            const a = (i / sides) * Math.PI * 2
            pts.push([Math.sin(a) * radius, Math.cos(a) * radius])
        }

        return pts
    }, [sides, radius])

    const crossGeometry = useMemo(() => {
        if (!crossSection?.enabled) return null

        const plane = crossSection.plane
        const pos = crossSection.position

        if (plane === 'XZ') {
            const shape = new THREE.Shape()

            shape.moveTo(vertices[0][0], vertices[0][1])

            for (let i = 1; i < vertices.length; i++) {
                shape.lineTo(vertices[i][0], vertices[i][1])
            }

            shape.closePath()

            const geo = new THREE.ShapeGeometry(shape)

            geo.rotateX(Math.PI / 2)
            geo.translate(0, pos, 0)

            return geo
        }

        if (plane === 'XY' || plane === 'YZ') {
            const halfH = height / 2
            const EPS = 1e-6

            const crossPts = {}

            for (let i = 0; i < sides; i++) {
                const [x1, z1] = vertices[i]
                const [x2, z2] = vertices[(i + 1) % sides]

                if (plane === 'XY') {
                    const dx = x2 - x1

                    if (Math.abs(dx) < EPS) {
                        if (Math.abs(x1 - pos) < EPS) {
                            const key1 = z1.toFixed(8)
                            const key2 = z2.toFixed(8)

                            crossPts[key1] = z1
                            crossPts[key2] = z2
                        }

                        continue
                    }

                    const t = (pos - x1) / dx

                    if (t < -EPS || t > 1 + EPS) continue

                    const tc = Math.max(0, Math.min(1, t))
                    const zc = z1 + tc * (z2 - z1)

                    const key = zc.toFixed(8)

                    crossPts[key] = zc
                } else {
                    const dz = z2 - z1

                    if (Math.abs(dz) < EPS) {
                        if (Math.abs(z1 - pos) < EPS) {
                            const key1 = x1.toFixed(8)
                            const key2 = x2.toFixed(8)

                            crossPts[key1] = x1
                            crossPts[key2] = x2
                        }

                        continue
                    }

                    const t = (pos - z1) / dz

                    if (t < -EPS || t > 1 + EPS) continue

                    const tc = Math.max(0, Math.min(1, t))
                    const xc = x1 + tc * (x2 - x1)

                    const key = xc.toFixed(8)

                    crossPts[key] = xc
                }
            }
            const coords = []

            for (const key in crossPts) {
                coords.push(crossPts[key])
            }

            coords.sort((a, b) => a - b)

            if (coords.length < 2) return null

            const posArr = []
            const idxArr = []

            let vi = 0

            for (let i = 0; i < coords.length - 1; i++) {
                const c1 = coords[i]
                const c2 = coords[i + 1]

                let b1
                let t1
                let b2
                let t2

                if (plane === 'XY') {
                    b1 = new THREE.Vector3(pos, -halfH, c1)
                    t1 = new THREE.Vector3(pos, halfH, c1)
                    b2 = new THREE.Vector3(pos, -halfH, c2)
                    t2 = new THREE.Vector3(pos, halfH, c2)
                } else {
                    b1 = new THREE.Vector3(c1, -halfH, pos)
                    t1 = new THREE.Vector3(c1, halfH, pos)
                    b2 = new THREE.Vector3(c2, -halfH, pos)
                    t2 = new THREE.Vector3(c2, halfH, pos)
                }

                const mid =
                    plane === 'XY'
                        ? new THREE.Vector3(pos, 0, (c1 + c2) / 2)
                        : new THREE.Vector3((c1 + c2) / 2, 0, pos)

                let inside = true

                for (let s = 0; s < sides; s++) {
                    const [ax, az] = vertices[s]
                    const [bx, bz] = vertices[(s + 1) % sides]

                    const ex = bx - ax
                    const ez = bz - az

                    const nx = -ez
                    const nz = ex

                    const dot = nx * (mid.x - ax) + nz * (mid.z - az)

                    if (dot > EPS) {
                        inside = false
                        break
                    }
                }

                if (!inside) continue

                posArr.push(
                    b1.x, b1.y, b1.z,
                    t1.x, t1.y, t1.z,
                    b2.x, b2.y, b2.z,
                    t2.x, t2.y, t2.z
                )

                idxArr.push(
                    vi, vi + 1, vi + 2,
                    vi + 1, vi + 3, vi + 2
                )

                vi += 4
            }

            if (posArr.length === 0) return null

            const geo = new THREE.BufferGeometry()

            geo.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(posArr, 3)
            )

            geo.setIndex(idxArr)
            geo.computeVertexNormals()

            return geo
        }

        return null
    }, [crossSection, vertices, height, sides])

    return (
        <>
            <ShapeWrapper
                color={color}
                geometry={geo}
                showEdges={showEdges}
                showBaseDiagonals={showBaseDiagonals}
                showInclined={showInclined}
                // showFaceDiagonals={showFaceDiagonals}
                // showFaceDiagonalsCount={showFaceDiagonalsCount}
                // showBodyDiagonals={showBodyDiagonals}
            />

            {crossSection?.enabled && crossGeometry && (
                <mesh geometry={crossGeometry}>
                    <meshStandardMaterial
                        color="#00e676"
                        side={THREE.DoubleSide}
                        transparent
                        opacity={0.65}
                        depthWrite={false}
                    />
                </mesh>
            )}
        </>
    )
}