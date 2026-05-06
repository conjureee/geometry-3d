import { Canvas } from '@react-three/fiber'

export default function Cuboid({width, height, depth}) {
    return (
        <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color="red" wireframe={false} />
        </mesh>
    )
}