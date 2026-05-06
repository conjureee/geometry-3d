import ShapeWrapper from './ShapeWrapper'

export default function Torus({ radius, tube, color }) {
    return (
        <ShapeWrapper color={color}>
            <torusGeometry args={[radius, tube, 16, 100]} />
        </ShapeWrapper>
    )
}