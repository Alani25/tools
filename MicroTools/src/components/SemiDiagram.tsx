
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

import Arrow from "./threeJSComp/Arrow";
import Cube from "./threeJSComp/Cube";
import TextObj from "./threeJSComp/TextObj";

import SimpleGraph from "./SimpleGraph";

const Vt = 1; // threshold voltage

// calculating DRAIN CURRENT
let Id = (Vg: number, Vds: number, k: number) => {
    if (Vg <= Vt)
        return 0;
    if (Vds >= (Vg - Vt))
        return 0.5 * k * (Vg - Vt) ** 2;
    return k * ((Vg - Vt) * Vds - (Vds ** 2 / 2));
}



// generating points for the Drain Current vs Drain Voltage Graph
function generateIdVdsCurve(Vg: number, k: number) {
    const pointsX = []
    const pointsY = []

    for (let Vds = 0; Vds <= 7; Vds += 0.1) {
        pointsX.push(Number((Vds).toFixed(1)));
        pointsY.push(Number((Id(Vg, Vds, k) * 1e3).toFixed(2)));
    }
    return [pointsX, pointsY];
}
// generating points for Gate Voltage vs Drain Current
function generateIdVgCurve(Vds: number, k: number) {
    const pointsX = []
    const pointsY = []

    for (let Vg = 0; Vg <= 5; Vg += .1) {
        pointsX.push(Number((Vg).toFixed(1)));
        pointsY.push(Number((Id(Vg, Vds, k) * 1e3 / 1.3).toFixed(2))); // already returns amps
    }

    return [pointsX, pointsY]
}




const SemiDiagram = () => {

    const canvasStyle = {
        width: '45%',
        // height: '90%',
        height: window.innerHeight / 1.2 - 120, // Example height
        backgroundColor: '#3e3e3eff', // Dark background for contrast
        borderRadius: '10px'
    }

    const PColor = "rgba(166, 166, 166, 1)";

    // const [size, setSize] = useState([2, 1, 1]);


    const [NPN, setNPN] = useState(true);

    const [L, setL] = useState(3);
    const [W, setW] = useState(15);

    const [Vg, setVg] = useState(3);
    const [Vds, setVds] = useState(2.4);

    const [trackChange, alertChange] = useState(0);

    let [frame, setFrame] = useState(0);

    let k_prime = 200e-6;

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

            <div style={{ display: "flex", gap: "5px" }}>

                {/* 3D CANVAS ELEMENT */}
                <div style={canvasStyle}>

                    <Canvas camera={{
                        position: [5, 1, 5],
                        rotation: [0, 0, 0] // note to self: this does nothing
                    }}>

                        {/* SCENE SET UP */}
                        <OrbitControls />
                        <ambientLight intensity={1} />
                        <pointLight position={[0, 2, 0]} intensity={5} />


                        {/* BASIC CUBE */}

                        {/* N-MOS, 2 N+ on top of 1 P, 0:48 */}
                        <Cube pos={[0, 0, -.9]} side={[L, W / 6 + 1.3, 2.1]} clr={NPN ? PColor : "hotpink"} ></Cube>
                        <Cube pos={[-L * .35, 0, -.01]} side={[L * 0.175, (W / 6 + 1.3) + .2, .5]} clr={NPN ? "hotpink" : PColor} ></Cube>
                        <Cube pos={[L * .35, 0, -.01]} side={[L * 0.175, (W / 6 + 1.3) + .2, .5]} clr={NPN ? "hotpink" : PColor} ></Cube>
                        {/* OXIDE & METAL LAYER */}
                        <Cube pos={[0, 0, .2]} side={[L - L * 0.35 * 1.3, W / 6 + 1.4, .15]} clr="gray" ></Cube>
                        <Cube pos={[0, 0, .35]} side={[L - L * 0.35 * 1.3, W / 6 + 1.4, .15]} clr="blue" ></Cube>
                        {/* METAL LAYER ON S&D */}
                        <Cube pos={[-L * .35, 0, .3]} side={[L * 0.07, (W / 6 + 1.3) + .2, .1]} clr="blue" ></Cube>
                        <Cube pos={[L * .35, 0, .3]} side={[L * 0.07, (W / 6 + 1.3) + .2, .1]} clr="blue" ></Cube>

                        {/* TEXT LABELS */}
                        <TextObj pos={[0, 0, 1.5]} fontSize={0.2} clr={"white"} text={NPN ? "N-MOS" : "P-MOS"}></TextObj>
                        <TextObj pos={[-L * .35, 0, 1.5]} fontSize={0.1 * L} clr={"lightblue"} text="source"></TextObj>
                        <TextObj pos={[L * .35, 0, 1.5]} fontSize={0.1 * L} clr={"lightblue"} text="drain"></TextObj>

                        {/* SOURCE & DRAIN ARROWS */}
                        <Arrow pos={[L * .35, (NPN ? 0.7 : 1.2) + (Math.sin(frame / 10) / 10) * (NPN ? 1 : -1), 0]} direction={[0, NPN ? Math.PI : -Math.PI, 0]} length={0.5} ></Arrow>
                        <Arrow pos={[-L * .35, (NPN ? 1.2 : 0.7) + (Math.sin(frame / 10) / 10) * (NPN ? -1 : 1), 0]} direction={[0, NPN ? -Math.PI : Math.PI, 0]} length={0.5} ></Arrow>

                        {/* Length Label */}
                        {trackChange == 1 && <TextObj pos={[0, (W / 6 + 1.3) / 2 + 0.1, 0]} fontSize={L / 10} clr={"white"} text={`L: ${L} µm`}></TextObj>}
                        {trackChange == 2 && <TextObj pos={[L / 2 + 0.1, 0, 0]} fontSize={W / 15} clr={"white"} text={`W: ${W} µm`} rotation={[0, 0, Math.PI / 2]}></TextObj>}








                    </Canvas>

                </div>

                <div>
                    <SimpleGraph
                        xValues={generateIdVdsCurve(Vg, k_prime * (W / L))[0]}
                        yValues={generateIdVdsCurve(Vg, k_prime * (W / L))[1]}
                        xLabel="Drain Voltage (V)"
                        yLabel="Drain Current (mA)"
                        title=""
                        maxY={Math.max(5, Id(Vg, 7, k_prime * (W / L)) * 1e3 + .5)}
                        color="red"
                        point={[Vds, Id(Vg, Vds, k_prime * (W / L)) * 1e3]}
                    />
                    <SimpleGraph
                        xValues={generateIdVgCurve(Vds, k_prime * (W / L))[0]}
                        yValues={generateIdVgCurve(Vds, k_prime * (W / L))[1]}
                        xLabel="Gate Voltage (V)"
                        yLabel="Drain Current (mA)"
                        title=""
                        maxY={Math.max(5, Id(5, Vds, k_prime * (W / L)) * 1e3 / 1.3 + .5)}
                        color="blue"
                        point={[Vg, Id(Vg, Vds, k_prime * (W / L)) * 1e3 / 1.3]}
                    />
                </div>
            </div>


            {/* INPUT FORM */}
            <form className="mt-3 mb-3">

                <div style={{ "display": "flex", "gap": "10px" }}>

                    {/* Vg SLIDER */}
                    <div style={{ "flex": 1 }}>
                        <label className="form-label">Gate Voltage: {Vg} V</label>
                        <input type="range" className="form-range" min="0" max="5" step="1" value={Vg}
                            // onMouseLeave={() => alertChange(0)}
                            onChange={(value) => {
                                setVg(Number(value.target.value));
                                // alertChange(1);
                            }}></input>
                    </div>


                    {/* Vds SLIDER */}
                    <div style={{ "flex": 1 }}>
                        <label className="form-label">Drain Voltage: {Vds} V</label>
                        <input type="range" className="form-range" min="0" max="7" step="0.1" value={Vds}
                            // onMouseLeave={() => alertChange(0)}
                            onChange={(value) => {
                                setVds(Number(value.target.value));
                                // alertChange(1);
                            }}></input>
                    </div>

                </div>

                <div style={{ "display": "flex", "gap": "30px" }}>
                    {/* LENGTH slider */}
                    <div style={{ "flex": 1 }}>
                        <label className="form-label">Length: {L} µm</label>
                        <input type="range" className="form-range" min="1" max="10" step="0.1" value={L}
                            onMouseLeave={() => alertChange(0)}
                            onChange={(value) => {
                                setL(Number(value.target.value));
                                alertChange(1);
                            }}></input>
                    </div>

                    {/* WIDTH slider */}
                    <div style={{ "flex": 1 }}>
                        <label className="form-label">Width: {W} µm</label>
                        <input type="range" className="form-range" min="1" max="15" step="0.1" value={W}
                            onMouseLeave={() => alertChange(0)}
                            onChange={(value) => {
                                setW(Number(value.target.value));
                                alertChange(2);
                            }}></input>
                    </div>
                </div>


                {/* Switching between NPN and PNP type transistors */}
                <div style={{ "display": "flex", "gap": "30px" }}>
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
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </>
    )
}

export default SemiDiagram;