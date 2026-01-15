import { ZERO_XY_COORDS } from "@gately/shared/config";
import { ScaleFactor, XYCoords } from "@gately/shared/types";
import { Accessor, Component } from "solid-js";

interface IWorkspaceGridProps {
    offset?: Accessor<XYCoords>;
    scaleFactor?: Accessor<ScaleFactor>;
    tileSize?: Accessor<number>;
    class?: string;
    tileUrl?: string;
}

export const WorkspaceGrid: Component<IWorkspaceGridProps> = (props) => {
    const { tileSize, offset, scaleFactor } = props;

    const gridPos = () => offset?.() ?? ZERO_XY_COORDS;
    const gridScale = () => scaleFactor?.() ?? 1;
    const gridSize = () => (tileSize?.() ?? 16) * gridScale();

    return (
        <div
            class={`${props.class} z-1 absolute w-full h-full bg-[url(${props.tileUrl})]`}
            style={{
                "background-position": `${gridPos().x}px ${gridPos().y}px`,
                "background-size": `${gridSize()}px ${gridSize()}px`,
            }}
        ></div>
    );
};
