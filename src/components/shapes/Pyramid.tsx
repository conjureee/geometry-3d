import { Canvas } from '@react-three/fiber'

export default function Pyramid() {
    return (
        <mesh>
            <coneGeometry args={[1.5, 2.75, 4]} />
            <meshStandardMaterial color="blue" wireframe={false} />
        </mesh>
    )
}
