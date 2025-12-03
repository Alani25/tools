import * as THREE from 'three'
import { useLoader } from "@react-three/fiber";

interface imageProps {
    src: string;
    pos: number[];
    side: number[];
}

const ImgPlane = ({ src, pos, side }: imageProps) => {
    const texture = useLoader(THREE.TextureLoader, src, (loader) => {
        loader.crossOrigin = "";
    });
    return (
        <mesh position={[pos[0], pos[2], pos[1]]} >
            <planeGeometry args={[side[0], side[1]]} />
            <meshBasicMaterial attach="material" map={texture} transparent={true} />
        </mesh>
    )
}

export default ImgPlane;