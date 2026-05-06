import { Canvas } from '@react-three/fiber'

export default function Cone({ radius = 1.5, height = 2.75, sides = 32 }) {
    return (
        <mesh>
            <coneGeometry args={[radius, height, sides]} />
            <meshStandardMaterial color="yellow" />
        </mesh>
    )
}