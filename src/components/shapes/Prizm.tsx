import { Canvas } from '@react-three/fiber'

export default function Prizm() {
    return (
        <mesh>
            <boxGeometry args={[1.75, 4, 1.75]} />
            <meshStandardMaterial color="wheat" wireframe={false} />
        </mesh>
    )
}