import { Canvas } from '@react-three/fiber'

export default function Tetrahedron() {
    return (
        <mesh>
            <tetrahedronGeometry args={[2]} />
            <meshStandardMaterial color="blue" wireframe={false} />
        </mesh>
    )
}
