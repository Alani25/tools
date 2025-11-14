import { Text } from "@react-three/drei";
import { type ReactNode } from "react";

interface textProps {
    pos: number[],
    fontSize: number,
    clr: string,
    text: ReactNode,
    rotation?: number[]
};

const TextObj = ({ pos, fontSize, clr, text, rotation = [0, 0, 0] }: textProps) => {
    return (
        < Text
            position={[pos[0], pos[2], pos[1]]} // Position above the cube/mosfet structure
            fontSize={fontSize}
            color={clr}
            rotation={[rotation[0], rotation[2], rotation[1]]}
            anchorX="center"
            anchorY="middle"
        >{text}</Text>
    )
}

export default TextObj;