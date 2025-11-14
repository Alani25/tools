interface cubeProps {
    pos: number[],
    side: number[],
    clr: string
};

const Cube = ({ pos, side, clr }: cubeProps) => {
    return (
        < mesh position={[pos[0], pos[2], pos[1]]} >
            <boxGeometry args={[side[0], side[2], side[1]]} />
            <meshStandardMaterial color={clr} />
        </mesh >
    )
}

export default Cube;