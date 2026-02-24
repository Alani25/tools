import { useState } from "react";
import { Alert } from "./components/Alert";
import { Button } from "./components/Button";
import ListGroup, { type ToolboxItem } from "./components/ListGroup";

import SemiDiagram from "./components/SemiDiagram";
import SSIM from "./components/SSIM";

function App() {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  const items = [
    { title: "About Me", link: "https://hamzah.page" },
    { title: "MOSFET Diagram", link: "threeJS" },
    { title: "DOE SSIM", link: "ssim" },
    { title: "Riemann Sum (2023)", link: "http://hamzah.page/graphing.html" },
    { title: "Project Needle", link: "https://itch.io/embed-upload/10541213?color=10364c" },
  ];

  const [iflink, switchIfLink] = useState(items[0].link);
  const [alertVisible, setAlertVisible] = useState(false);

  const closeOffcanvas = () => {
    const el = document.getElementById("toolboxOffcanvas");
    if (!el) return;

    // Bootstrap attaches its JS API to window.bootstrap
    const w = window as any;
    const Offcanvas = w?.bootstrap?.Offcanvas;
    if (!Offcanvas) return;

    const instance = Offcanvas.getInstance(el) || new Offcanvas(el);
    instance.hide();
  };

  const onItemSelect = (item: ToolboxItem) => {
    switchIfLink(item.link);
    closeOffcanvas();
    setTimeout(() => document.getElementById("displayIframe")?.focus(), 0);
  };

  return (
    <div className="container-fluid p-0 m-0">
      {/* Menu button overlay */}
      <button
        type="button"
        className="btn btn-dark position-fixed top-0 start-0 m-3 rounded-3"
        style={{ zIndex: 1056 }} // higher than offcanvas backdrop is fine
        data-bs-toggle="offcanvas"
        data-bs-target="#toolboxOffcanvas"
        aria-controls="toolboxOffcanvas"
      >
        ☰
      </button>

      {/* Offcanvas menu */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="toolboxOffcanvas"
        aria-labelledby="toolboxOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="toolboxOffcanvasLabel">
            Toolbox
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="offcanvas-body">
          <ListGroup items={items} name={"Toolbox"} onSelectItem={onItemSelect} />

          <div className="mt-3 mb-3">
            <Button onClick={() => setAlertVisible(!alertVisible)} color={"secondary"}>
              Click Me
            </Button>
            {alertVisible && (
              <Alert onClose={() => setAlertVisible(false)}>
                Hello <sup>world</sup> World
              </Alert>
            )}
          </div>
        </div>
      </div>

      {/* Main frame: full window */}
      <div className="p-0 m-0">
        {iflink === "threeJS" ? (
          <SemiDiagram />
        ) : iflink === "ssim" ? (
          <SSIM />
        ) : (
          <iframe
            src={iflink}
            className="rounded-3 w-100"
            height={window.innerHeight}
            width={window.innerWidth}
            id="displayIframe"
          />
        )}
      </div>
    </div>
  );
}

export default App;