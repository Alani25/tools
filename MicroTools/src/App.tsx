import { useState } from "react";
import { Alert } from "./components/Alert";
import { Button } from "./components/Button";
import ListGroup, { type ToolboxItem } from "./components/ListGroup";

import SemiDiagram from "./components/SemiDiagram";
import SSIM from "./components/SSIM";


function App() {


  const items = [
    { title: "DOE SSIM", link: "ssim" },
    { title: "MOSFET Diagram", link: "threeJS" },
    { title: "Riemann Sum (2023)", link: "http://hamzah.page/graphing.html" },
    { title: "Project Needle", link: "https://itch.io/embed-upload/10541213?color=10364c" },
    { title: "About Me", link: "https://hamzah.page" }
  ];

  let [iflink, switchIfLink] = useState(items[0].link);

  const onItemSelect = (item: ToolboxItem) => {
    console.warn(item);
    switchIfLink(item.link);
    document.getElementById("displayIframe")?.focus();
  }

  const [alertVisible, setAlertVisible] = useState(false);


  return <div className="mt-3 container-fluid">

    <div className="row container-fluid">

      <div className="col-md-3">
        <ListGroup items={items} name={"Toolbox"} onSelectItem={onItemSelect} />

        <div className="mt-3 mb-3">
          <Button onClick={() => setAlertVisible(!alertVisible)} color={"secondary"}>Click Me</Button>
          {alertVisible && <Alert onClose={() => setAlertVisible(false)} >Hello <sup>world</sup> World</Alert>}
        </div>
      </div>

      <div className="col">
        {iflink == "threeJS" ? (<SemiDiagram></SemiDiagram>) :
          iflink === "ssim" ? (<SSIM></SSIM>) : <iframe src={iflink} className="rounded-3" height={window.innerHeight - 70} width="100%" id="displayIframe" ></iframe>}
      </div>

    </div>

  </div >

}

export default App;