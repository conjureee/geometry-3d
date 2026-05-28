import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Sphere({ radius = 1, color, showEdges, showEquator, showRadius }) {
    const geo = useMemo(() => new THREE.SphereGeometry(radius, 32, 24), [radius])

    const equatorGeo = useMemo(() => {
        const pts = []
        for (let i = 0; i <= 128; i++) {
            const a = (i / 128) * Math.PI * 2
            pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
        }
        return new THREE.BufferGeometry().setFromPoints(pts)
    }, [radius])

    return (
        <ShapeWrapper color={color} showEdges={showEdges} geometry={geo}>
            <primitive object={geo} attach="geometry" />

            {showEquator && (
                <line>
                    <primitive object={equatorGeo} attach="geometry" />
                    <lineBasicMaterial color="#ffc832" />
                </line>
            )}

            {showRadius && (
                <line>
                    <bufferGeometry ref={ref => {
                        if (ref) ref.setFromPoints([
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(radius, 0, 0),
                        ])
                    }} />
                    <lineBasicMaterial color="#50ff78" />
                </line>
            )}
        </ShapeWrapper>
    )
}