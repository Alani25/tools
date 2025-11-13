interface Props {
    children: String;
    onClick: () => void;
    color?: String;
}

export const Button = ({ children, onClick, color = "primary" }: Props) => {
    return (
        <button className={"btn btn-" + color} onClick={onClick}>{children}</button>
    )
}
