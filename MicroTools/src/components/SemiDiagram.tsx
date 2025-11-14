
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

import Arrow from "./threeJSComp/Arrow";
import Cube from "./threeJSComp/Cube";
import TextObj from "./threeJSComp/TextObj";




const SemiDiagram = () => {

    const canvasStyle = {
        width: '70%',
        height: window.innerHeight / 1.2 - 120, // Example height
        backgroundColor: '#3e3e3eff', // Dark background for contrast
        borderRadius: '10px'
    }

    const PColor = "rgba(166, 166, 166, 1)";

    // const [size, setSize] = useState([2, 1, 1]);

    const [NPN, setNPN] = useState(true);

    const [L, setL] = useState(4);
    const [W, setW] = useState(1);

    const [trackChange, alertChange] = useState(1);

    let [frame, setFrame] = useState(0);

    useEffect(() => {
        const intervalID = setInterval(() => {
            // 2. Update the state with the new second value
            setFrame(currentFrame => currentFrame + 1);
        }, 1000 / 24)

        return () => clearInterval(intervalID);
    }, [])



    return (
        <>
            <h1>SemiDiagram</h1>

            {/* 3D CANVAS ELEMENT */}
            <div style={canvasStyle}>

                <Canvas camera={{
                    position: [1, 1, 4],
                    rotation: [0, 0, 0]
                }}>

                    {/* SCENE SET UP */}
                    <OrbitControls />
                    <ambientLight intensity={1} />
                    <pointLight position={[0, 2, 0]} intensity={5} />


                    {/* BASIC CUBE */}

                    {/* N-MOS, 2 N+ on top of 1 P, 0:48 */}
                    <Cube pos={[0, 0, -.9]} side={[L, W / 2 + 1.3, 2.1]} clr={NPN ? PColor : "hotpink"} ></Cube>
                    <Cube pos={[-L * .35, 0, -.01]} side={[L * 0.175, (W / 2 + 1.3) + .2, .5]} clr={NPN ? "hotpink" : PColor} ></Cube>
                    <Cube pos={[L * .35, 0, -.01]} side={[L * 0.175, (W / 2 + 1.3) + .2, .5]} clr={NPN ? "hotpink" : PColor} ></Cube>
                    {/* OXIDE & METAL LAYER */}
                    <Cube pos={[0, 0, .2]} side={[L - L * 0.35 * 1.3, W / 2 + 1.4, .15]} clr="gray" ></Cube>
                    <Cube pos={[0, 0, .35]} side={[L - L * 0.35 * 1.3, W / 2 + 1.4, .15]} clr="blue" ></Cube>
                    {/* METAL LAYER ON S&D */}
                    <Cube pos={[-L * .35, 0, .3]} side={[L * 0.07, (W / 2 + 1.3) + .2, .1]} clr="blue" ></Cube>
                    <Cube pos={[L * .35, 0, .3]} side={[L * 0.07, (W / 2 + 1.3) + .2, .1]} clr="blue" ></Cube>

                    {/* TEXT LABELS */}
                    <TextObj pos={[0, 0, 1.5]} fontSize={0.2} clr={"white"} text={NPN ? "N-MOS" : "P-MOS"}></TextObj>
                    <TextObj pos={[-L * .35, 0, 1.5]} fontSize={0.3} clr={"lightblue"} text="source"></TextObj>
                    <TextObj pos={[L * .35, 0, 1.5]} fontSize={0.3} clr={"lightblue"} text="drain"></TextObj>

                    {/* SOURCE & DRAIN ARROWS */}
                    <Arrow pos={[L * .35, (NPN ? 0.7 : 1.2) + (Math.sin(frame / 10) / 10) * (NPN ? 1 : -1), 0]} direction={[0, NPN ? Math.PI : -Math.PI, 0]} length={0.5} ></Arrow>
                    <Arrow pos={[-L * .35, (NPN ? 1.2 : 0.7) + (Math.sin(frame / 10) / 10) * (NPN ? -1 : 1), 0]} direction={[0, NPN ? -Math.PI : Math.PI, 0]} length={0.5} ></Arrow>

                    {/* Length Label */}
                    {trackChange == 1 && <TextObj pos={[0, (W / 2 + 1.3) / 2 + 0.1, 0]} fontSize={L / 10} clr={"white"} text={`L: ${L} µm`}></TextObj>}
                    {trackChange == 2 && <TextObj pos={[L / 2 + 0.1, 0, 0]} fontSize={W / 5} clr={"white"} text={`W: ${W} µm`} rotation={[0, 0, Math.PI / 2]}></TextObj>}








                </Canvas>

            </div>


            {/* INPUT FORM */}
            <form className="mt-3 mb-3">


                {/* LENGTH slider */}
                <label className="form-label">Length: {L} µm</label>
                <input type="range" className="form-range" min="1" max="10" step="0.1" id="range3" value={L}
                    onMouseLeave={() => alertChange(0)}
                    onChange={(value) => {
                        setL(Number(value.target.value));
                        alertChange(1);
                    }}></input>

                {/* WIDTH slider */}
                <label className="form-label">Width: {W} µm</label>
                <input type="range" className="form-range" min="1" max="5" step="0.1" id="range3" value={W}
                    onMouseLeave={() => alertChange(0)}
                    onChange={(value) => {
                        setW(Number(value.target.value));
                        alertChange(2);
                    }}></input>


                {/* Switching between NPN and PNP type transistors */}
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkPNP" checked={NPN}
                        onClick={() => setNPN(!NPN)}></input>
                    <label className="form-check-label">NPN Transistor</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="checkNPN" checked={!NPN}
                        onClick={() => setNPN(!NPN)}></input>
                    <label className="form-check-label">PNP Transistor</label>
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default SemiDiagram;