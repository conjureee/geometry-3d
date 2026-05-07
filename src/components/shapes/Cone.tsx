import { useMemo } from 'react'
import * as THREE from 'three'
import ShapeWrapper from './ShapeWrapper'

export default function Cone({ radius = 1.25, height = 2.5, color, showEdges, showRadius, showHeight }) {
    const geo = useMemo(() => new THREE.ConeGeometry(radius, height, 64), [radius, height])

    return (
        <ShapeWrapper color={color} showEdges={showEdges} geometry={geo}>
            <primitive object={geo} attach="geometry" />
            {showRadius && (
                <line>
                    <bufferGeometry
                        ref={ref => {
                            if (ref) {
                                const pts = [
                                    new THREE.Vector3(0, -height / 2, 0),
                                    new THREE.Vector3(radius, -height / 2, 0),
                                ]
                                ref.setFromPoints(pts)
                            }
                        }}
                    />
                    <lineBasicMaterial color="rgba(255,200,50)" />
                </line>
            )}
            {showHeight && (
                <line>
                    <bufferGeometry
                        ref={ref => {
                            if (ref) {
                                const pts = [
                                    new THREE.Vector3(0, -height / 2, 0),
                                    new THREE.Vector3(0,  height / 2, 0),
                                ]
                                ref.setFromPoints(pts)
                            }
                        }}
                    />
                    <lineBasicMaterial color="rgba(80,255,120)" />
                </line>
            )}
        </ShapeWrapper>
    )
}