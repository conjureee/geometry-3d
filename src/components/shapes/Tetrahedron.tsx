import { Canvas } from '@react-three/fiber'

export default function Tetrahedron({radius}) {
    return (
        <mesh>
            <tetrahedronGeometry args={[radius]} />
            <meshStandardMaterial color="blue" wireframe={false} />
        </mesh>
    )
}
