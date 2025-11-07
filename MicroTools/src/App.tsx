import ListGroup from "./components/listgroup";

function App() {

  const items = [
    "Intro to Semiconductors",
    "Statistics & DOE",
    "Calculus",
    "Personal Projects"
  ];


  return <div>
    <ListGroup items={items} name={"Toolbox"} />
  </div>
}

export default App;