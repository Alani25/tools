import { Html, Text } from "@react-three/drei";
import { useState, type ReactNode } from "react";

interface cylinderProps {
    pos: number[],
    height: number,
    radius: number,
    clr: string,
    posHover?: number[],
    zoomHover?: number,
    text?: ReactNode
};

const Cylinder = ({ pos, height, radius, clr, posHover = pos, zoomHover = 1, text = (<></>) }: cylinderProps) => {

    const [hoverState, onHoverState] = useState(0);
    const [coords, updateCoords] = useState([0, 0, 0]);

    let scale = (hoverState ? zoomHover : 1);

    return (
        <>
            < mesh position={[(hoverState ? posHover : pos)[0], (hoverState ? posHover : pos)[2] + height * scale / 2, (hoverState ? posHover : pos)[1]]}
                onPointerEnter={(e) => {
                    e.stopPropagation()
                    onHoverState(1)
                }}
                onPointerLeave={() => onHoverState(0)}
                onPointerMove={(e) => {
                    e.stopPropagation();
                    updateCoords([e.point.x + .1, e.point.y - .1, e.point.z])
                    // alert(clr)
                }}
            >

                <cylinderGeometry args={[radius * scale, radius * scale, height * scale]} />
                <meshStandardMaterial color={clr} />
            </mesh >
            {hoverState && (
                <Html position={coords}>
                    <h1 style={{ color: clr }}>{text}</h1>
                </Html>
            )}
        </>
    )
}

export default Cylinder;