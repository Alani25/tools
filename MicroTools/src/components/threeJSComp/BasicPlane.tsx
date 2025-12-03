interface planeProps {
    clr: string;
    pos: number[];
    side: number[];
    opacity?: number;
}

const BasicPlane = ({ clr, pos, side, opacity = 1 }: planeProps) => {
    return (
        <mesh position={[pos[0], pos[2] - side[1]/2, pos[1]]} >
            <planeGeometry args={[side[0], side[1]]} />
            <meshStandardMaterial color={clr} transparent = {opacity < 1} opacity={opacity}/>
        </mesh>
    )
}

export default BasicPlane;