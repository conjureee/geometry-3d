import { Canvas } from '@react-three/fiber'

export default function Torus() {
    return (
        <mesh>
            <torusGeometry args={[1, 0.4, 16, 100]} />
            <meshStandardMaterial color="red" wireframe={false} />
        </mesh>
    )
}