interface mapProps {
    Vgs: number;
    Vds: number;
    L: number;
    W: number;
    NPN: boolean;
    frame: number;
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d")!;
const scale = 100;

export const FieldMap = ({ Vgs, Vds, L, W, NPN, frame }: mapProps) => {
    canvas.width = L * scale;
    canvas.height = 4.1 * scale;

    // empty canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, L * scale, W * scale + 10 * Math.sin(frame));

    return canvas.toDataURL();
}

export default FieldMap;