import ShapeWrapper from './ShapeWrapper'

export default function Prizm({ radius, height, sides, color }) {
    return (
        <ShapeWrapper color={color}>
            <cylinderGeometry args={[radius, radius, height, sides]} />
        </ShapeWrapper>
    )
}