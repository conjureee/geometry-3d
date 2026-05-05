import { Canvas } from '@react-three/fiber'

export default function Ellipsoid() {
    return (
        <mesh scale={[1.5, 1, 1]}>
            <sphereGeometry args={[1.5, 64, 32]} />
            <meshStandardMaterial color="grey" />
        </mesh>
    )
}