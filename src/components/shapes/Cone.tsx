import { Canvas } from '@react-three/fiber'

export default function Cone() {
    return (
        <mesh>
            <coneGeometry args={[1.5, 2.75, 32]} />
            <meshStandardMaterial color="yellow" wireframe={false} />
        </mesh>
    )
}