import ShapeWrapper from './ShapeWrapper'

export default function Sphere({ radius, color }) {
    return (
        <ShapeWrapper color={color}>
            <sphereGeometry args={[radius, 32, 32]} />
        </ShapeWrapper>
    )
}