import ShapeWrapper from './ShapeWrapper'

export default function Cylinder({ radius, height, color }) {
    return (
        <ShapeWrapper color={color}>
            <cylinderGeometry args={[radius, radius, height, 128]} />
        </ShapeWrapper>
    )
}