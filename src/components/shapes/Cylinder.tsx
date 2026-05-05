import { Canvas } from '@react-three/fiber'

export default function Cylinder() {
    return (
        <mesh>
            <cylinderGeometry args={[1, 1, 2.75, 128]} />
            <meshStandardMaterial color="orange" wireframe={true} />
        </mesh>
    )
}