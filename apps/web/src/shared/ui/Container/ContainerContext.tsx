import { Accessor, Component, JSX } from "solid-js";
import { XYCoords, ScaleFactor } from "./types";

interface ViewportContextProps {
    class?: string;
    ref?: (el: HTMLDivElement) => void;
    scaleFactor?: Accessor<ScaleFactor>;
    offset?: Accessor<XYCoords>;
    children?: JSX.Element;
}

export const ViewportContext: Component<ViewportContextProps> = (props) => {
    return (
        <div
            class={`absolute w-fit h-fit ${props.class}`}
            ref={props.ref}
            style={{
                translate: `${props.offset?.().x ?? 0}px ${props.offset?.().y ?? 0}px`,
                scale: props.scaleFactor?.() ?? 1,
            }}
        >
            {props.children}
        </div>
    );
};
