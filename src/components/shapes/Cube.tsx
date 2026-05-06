import ShapeWrapper from './ShapeWrapper'

export default function Cube({ size, color }) {
    return (
        <ShapeWrapper color={color}>
            <boxGeometry args={[size, size, size]} />
        </ShapeWrapper>
    )
}