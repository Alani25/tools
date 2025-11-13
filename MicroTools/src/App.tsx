import { useState } from "react";
import { Alert } from "./components/Alert";
import { Button } from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {

  const items = [
    "All",
    "Intro to Semiconductors",
    "Statistics & DOE",
    "Calculus",
    "Personal Projects"
  ];

  const onItemSelect = (item: string) => {
    console.warn(item);
  }

  const [alertVisible, setAlertVisible] = useState(false);


  return <div className="p-3 col">
    <div>
      <ListGroup items={items} name={"Toolbox"} onSelectItem={onItemSelect} />
      {alertVisible && <Alert onClose={() => setAlertVisible(false)} >Hello <sup>world</sup> World</Alert>}
    </div>

    <Button onClick={() => setAlertVisible(true)} color={"secondary"}>Click Me</Button>


  </div>
}

export default App;