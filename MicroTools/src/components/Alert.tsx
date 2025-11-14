import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClose: () => void;
}
export const Alert = ({ children, onClose }: Props) => {
    return (
        <div className="alert alert-primary alert-dismissible mt-3 mb-3" role="alert">

            {children}
            <button type="button" className="btn-close" onClick={onClose}></button>

        </div>
    )
}

