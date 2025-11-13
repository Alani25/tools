import { useState } from "react";


interface Props {
    items: string[];
    name: string;
    onSelectItem: (item: string) => void;
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
                        className={selectedIndex == index ? "list-group-item active" : "list-group-item"}
                        key={item}
                        onClick={
                            () => {
                                setSelectedIndex(index);
                                onSelectItem(item);
                            }
                        }>
                        {item}
                    </li>
                ))}

            </ul>
        </>
    );
}

export default ListGroup;

