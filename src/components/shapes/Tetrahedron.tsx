import ShapeWrapper from './ShapeWrapper'

export default function Tetrahedron({ radius, color }) {
    return (
        <ShapeWrapper color={color}>
            <tetrahedronGeometry args={[radius]} />
        </ShapeWrapper>
    )
}