import { Canvas } from '@react-three/fiber'

export default function Sphere() {
    return (
        <mesh>
            <sphereGeometry args={[1.75, 32, 32]} />
            <meshStandardMaterial color="green" wireframe={false} />
        </mesh>
    )
}