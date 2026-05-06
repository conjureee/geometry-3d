import { Canvas } from '@react-three/fiber'

export default function Cylinder({radius, height}) {
    return (
        <mesh>
            <cylinderGeometry args={[radius, radius, height, 128]} />
            <meshStandardMaterial color="orange" wireframe={false} />
        </mesh>
    )
}