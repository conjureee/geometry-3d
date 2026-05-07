import { Canvas } from '@react-three/fiber'

export default function ShapeWrapper({ children, color = 'white' }) {
    return (
        <mesh>
            {children}
            <meshStandardMaterial color={color} wireframe={true} />
        </mesh>
    )
}