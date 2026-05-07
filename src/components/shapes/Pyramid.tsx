import ShapeWrapper from './ShapeWrapper'

export default function Pyramid({ radius = 1.5, height = 2.75, sides = 5, color }) {
    return (
        <ShapeWrapper color={color}>
            <coneGeometry args={[radius, height, sides]} />
        </ShapeWrapper>
    )
}