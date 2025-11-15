import { Html, Text } from "@react-three/drei";
import { useState, type ReactNode } from "react";

interface cubeProps {
    pos: number[],
    side: number[],
    clr: string,
    posHover?: number[],
    zoomHover?: number,
    text?: ReactNode
};

const Cube = ({ pos, side, clr, posHover = pos, zoomHover = 1, text = (<>Hello</>) }: cubeProps) => {

    const [hoverState, onHoverState] = useState(0);
    const [coords, updateCoords] = useState([0, 0, 0]);

    let scale = (hoverState ? zoomHover : 1);

    return (
        <>
            < mesh position={[(hoverState ? posHover : pos)[0], (hoverState ? posHover : pos)[2], (hoverState ? posHover : pos)[1]]}
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

                <boxGeometry args={[side[0] * scale, side[2] * scale, side[1] * scale]} />
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

export default Cube;