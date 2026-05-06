import { Canvas } from '@react-three/fiber'

export default function Pyramid({radius, height}) {
    return (
        <mesh>
            <coneGeometry args={[radius, height, 4]} />
            <meshStandardMaterial color="blue" wireframe={false} />
        </mesh>
    )
}
