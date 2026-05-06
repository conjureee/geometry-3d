import { Canvas } from '@react-three/fiber'

export default function Torus({radius, tube}) {
    return (
        <mesh>
            <torusGeometry args={[radius, tube, 16, 100]} />
            <meshStandardMaterial color="red" wireframe={false} />
        </mesh>
    )
}