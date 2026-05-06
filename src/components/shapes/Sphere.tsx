import { Canvas } from '@react-three/fiber'

export default function Sphere({radius}) {
    return (
        <mesh>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color="green" wireframe={false} />
        </mesh>
    )
}