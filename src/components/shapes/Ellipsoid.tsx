import ShapeWrapper from './ShapeWrapper'

export default function Ellipsoid({ scaleX, scaleY, scaleZ, color }) {
    return (
        <mesh scale={[scaleX, scaleY, scaleZ]}>
            <sphereGeometry args={[1.5, 64, 32]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}