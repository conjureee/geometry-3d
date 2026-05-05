import { Canvas } from '@react-three/fiber'

export default function Cube() {
    return (
        <mesh>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial color="green" wireframe={false} />
        </mesh>
    )
}