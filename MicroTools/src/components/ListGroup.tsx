import { useState } from "react";
import "../App.css";


export interface ToolboxItem {
    title: string;
    link: string;
}

interface Props {
    items: ToolboxItem[];
    name: string;
    onSelectItem: (item: ToolboxItem) => void;
}

function ListGroup({ items, name, onSelectItem }: Props) {



    // // event handler
    // const handleClick = (event: MouseEvent) => console.log(event);

    // selected index
    const [selectedIndex, setSelectedIndex] = useState(0);


    return (
        <>
            <h1>{name}</h1>
            <ul className="list-group">

                {items.map((item, index) => (
                    <li
                        className={"list-group-item-action " + (selectedIndex == index ? "list-group-item active" : "list-group-item")}
                        key={item.title}
                        onClick={
                            () => {
                                setSelectedIndex(index);
                                onSelectItem(item);
                            }
                        }>
                        {item.title}
                    </li>
                ))}

            </ul>
        </>
    );
}

export default ListGroup;