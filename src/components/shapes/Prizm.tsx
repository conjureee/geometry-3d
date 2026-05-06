import ShapeWrapper from './ShapeWrapper'

export default function Prizm({ width, height, depth, color }) {
    return (
        <ShapeWrapper color={color}>
            <boxGeometry args={[width, height, depth]} />
        </ShapeWrapper>
    )
}