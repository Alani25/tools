interface cardProps {
    title: string,
    text?: string,
    imageSrc?: string,
    w?: string,
    buttonText?: string
    buttonFunction: () => void,
}

const Card = ({ title, text = "", imageSrc = "vite.svg", w = "400px", buttonText = "Upload Image", buttonFunction }: cardProps) => {


    return (
        <div className="card m-3" style={{ width: w }}>
            <img src={imageSrc}></img>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <button className="btn btn-primary"
                    onClick={buttonFunction}
                >{buttonText}</button>
            </div>
        </div>
    )
}

export default Card;


// <div className="card m-3" style={{ width: "40%" }}>
//     <img src="vite.svg"></img>
//     <div className="card-body">
//         <h5 className="card-title">Image 1</h5>
//         <p className="card-text">Click to upload image 1.</p>
//         <a href="#" className="btn btn-primary">Upload Image</a>
//     </div>
// </div>