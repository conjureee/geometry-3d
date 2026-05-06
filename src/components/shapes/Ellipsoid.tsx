import { Canvas } from '@react-three/fiber'

export default function Ellipsoid({scaleX, scaleY, scaleZ}) {
    return (
        <mesh scale={[scaleX, scaleY, scaleZ]}>
            <sphereGeometry args={[1.5, 64, 32]} />
            <meshStandardMaterial color="grey" />
        </mesh>
    )
}