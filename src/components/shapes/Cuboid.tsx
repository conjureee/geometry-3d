import { Canvas } from '@react-three/fiber'

export default function Cuboid() {
    return (
        <mesh>
            <boxGeometry args={[4, 1.75, 1.75]} />
            <meshStandardMaterial color="red" wireframe={false} />
        </mesh>
    )
}