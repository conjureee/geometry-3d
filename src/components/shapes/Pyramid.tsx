import ShapeWrapper from './ShapeWrapper'

export default function Pyramid({ radius, height, color }) {
    return (
        <ShapeWrapper color={color}>
            <coneGeometry args={[radius, height, 4]} />
        </ShapeWrapper>
    )
}