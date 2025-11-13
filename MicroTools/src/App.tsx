import { useState } from "react";
import { Alert } from "./components/Alert";
import { Button } from "./components/Button";
import ListGroup, { type ToolboxItem } from "./components/ListGroup";

function App() {

  let [iflink, switchIfLink] = useState("https://hamzah.page");

  const items = [
    { title: "About Me", link: "https://hamzah.page" },
    { title: "Intro to Semiconductors", link: "/projects/project1Test/index.html" },
    { title: "Statistics & DOE", link: "https://hamzah.page" },
    { title: "Riemann Sum", link: "http://hamzah.page/graphing.html" },
    { title: "Project Needle", link: "https://itch.io/embed-upload/10541213?color=10364c" }
  ];

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
        {alertVisible && <Alert onClose={() => setAlertVisible(false)} >Hello <sup>world</sup> World</Alert>}
      </div>

      <div className="col">
        <iframe src={iflink} height={window.innerHeight - 70} width="100%" id="displayIframe"></iframe>
      </div>

    </div>

    <Button onClick={() => setAlertVisible(true)} color={"secondary"}>Click Me</Button>

  </div >

}

export default App;