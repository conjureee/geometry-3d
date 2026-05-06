import { Canvas } from '@react-three/fiber'

export default function Cube({size}) {
    return (
        <mesh>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color="green" wireframe={false} />
        </mesh>
    )
}