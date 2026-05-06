import { Canvas } from '@react-three/fiber'

export default function Prizm({width, height, depth}) {
    return (
        <mesh>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color="wheat" wireframe={false} />
        </mesh>
    )
}