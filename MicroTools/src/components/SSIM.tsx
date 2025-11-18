import { useEffect, useState } from "react";
import Card from "./SSIMComp/Card";

interface imageProps {
    filename: string;
    src: string;
    img: HTMLImageElement;
    width: number;
    height: number;
}


const SSIM = () => {

    const [image1, setImage1] = useState<imageProps | null>(null);
    const [image2, setImage2] = useState<imageProps | null>(null);

    const [progress, setProgress] = useState(-1);

    const [steps, setSteps] = useState(201); // zero steps for max/ standard
    const [stepNumb, takeStep] = useState(-1);

    const [SSIMIMG, setSSIMIMG] = useState("");

    // MAIN SSIM ALGORITHM 
    useEffect(() => {
        if (stepNumb < 0 || !image1 || !image2) return;

        const runStep = async () => {
            const maxS = steps || (image1.width * image1.height);

            const canvas = document.createElement("canvas");
            canvas.width = image1.width + image2.width;
            canvas.height = Math.max(image1.height, image2.height);

            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(image1.img, 0, 0);
            ctx.drawImage(image2.img, image1.width, 0);

            setSSIMIMG(canvas.toDataURL());
            setProgress((stepNumb / maxS) * 100);


            await new Promise(requestAnimationFrame); // allow UI to update

            if (stepNumb >= maxS) {
                setProgress(100);
                takeStep(-1); // done
            } else {
                takeStep(stepNumb + 1); // schedule next step
            }
            console.log(`Step: ${stepNumb}\nProgress: ${progress}`)
        };

        runStep();
    }, [stepNumb]);


    // if (stepNumb > -1)
    //     takeStep(stepNumb + 1);
    // if (progress > -1) {
    //     setProgress(100 * stepNumb / maxS);
    // }


    // uploading image function
    const uploadImage = async (setImageFunction: (image: imageProps) => void) => {
        var input = document.createElement('input');
        input.type = "file";
        input.accept = "image/*";
        input.click();
        input.onchange = () => {
            const file = input.files;
            if (!file || !file[0])
                return;

            const img = new Image();
            const src = URL.createObjectURL(file[0]);
            img.onload = () => {
                setImageFunction({
                    filename: file[0].name,
                    src,
                    img,
                    width: img.width,
                    height: img.height
                }
                );
            }
            img.src = src;
        }
    }

    let allowMessage = (image1 && image2) ? ((image1.width / image1.height == image2.width / image2.height) ? "" : "Images have different size ratio! Make sure both images are around the same size!") : "Must upload 2 images for comparison!";

    // if (allowMessage)
    // setProgress();


    return (
        <div>
            <h1 style={{ "display": "flex", "justifyContent": "center" }}>SSIM Test</h1>

            {/* IMAGE CARDS */}
            <div style={{ "display": "flex", "justifyContent": "center" }}>
                <Card
                    title={image1 ? image1.filename : "Image 1"}
                    text={image1 ? `${image1.width} x ${image1.height}` : "Click to upload Image 1"}
                    imageSrc={image1 ? image1.src : "vite.svg"}
                    buttonFunction={() => uploadImage(setImage1)} />
                <Card
                    title={image2 ? image2.filename : "Image 2"}
                    text={image2 ? `${image2.width} x ${image2.height}` : "Click to upload Image 2"}
                    imageSrc={image2 ? image2.src : "vite.svg"}
                    buttonFunction={() => uploadImage(setImage2)} />
            </div>

            {/* SET STEPS & RUN TEST BUTTON + WARNINGS ZONE */}

            <div style={{ "display": "flex", "justifyContent": "center", "gap": "10px" }}>
                <label className="form-label">Steps: {steps}</label>
                <input type="range" className="form-range" min="1" max="100" value={steps} id="range4"
                    onChange={(v) => setSteps(Number(v.target.value))}
                    style={{ "width": "40%" }}></input>
            </div>

            <button className={"btn " + ((allowMessage || (progress > -1 && progress < 100)) ? "btn-secondary" : "btn-primary")}
                onClick={() => {
                    // setProgress(Number(prompt("Enter new state as a test"))); // TODO set progress to zero
                    setProgress(0);
                    takeStep(0);
                }}>Run SSIM Test</button>

            <p style={{ color: "red" }}>{allowMessage || ""}</p>


            <>
                {progress > -1 && stepNumb > -1 &&
                    <div className="progress">
                        <div className="progress-bar" style={{ "width": progress + `%` }}></div>
                    </div>
                }
                {SSIMIMG && <img src={SSIMIMG} width={"100%"} className="mt-3 mb-5"></img>}
            </>


        </div>
    )
}

export default SSIM;