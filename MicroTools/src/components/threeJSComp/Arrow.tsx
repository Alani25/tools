import * as THREE from 'three';
import { useMemo } from "react";

interface arrowProps {
    pos: number[];
    direction: number[];
    length?: number;
    color?: string;
}

const Arrow = ({ pos, direction, length = 1, color = "cyan" }: arrowProps) => {

    // convert input arrays into THREE.Vector3 objects
    const dirVector = useMemo(() => new THREE.Vector3().fromArray(direction).normalize(), [direction]);
    const originVector = useMemo(() => new THREE.Vector3().fromArray(pos), [pos]);

    // NOTE: The ArrowHelper is a primitive, not a standard mesh, so we use the 
    // <primitive> component to render it and pass the arguments via props.
    return (
        <primitive
            object={new THREE.ArrowHelper(
                dirVector, // Direction (Vector3)
                originVector, // Start Position (Vector3)
                length, // Length (Number)
                color, // Color (String)

            )}
            scale={[10, 1, 1]}
        />
    );
}

export default Arrow;