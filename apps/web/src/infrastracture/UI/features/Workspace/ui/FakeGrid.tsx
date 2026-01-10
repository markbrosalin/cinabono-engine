import { Component } from "solid-js";

const FakeGrid: Component<{ class?: string }> = () => {
    return (
        <div
            class="absolute inset-0 pointer-events-none w-full h-full bg-[url(@/infrastracture/UI/shared/assets/workspace_tile.svg)]"
            style={{
                "background-position": `0.5px 0.5px`,
            }}
        ></div>
    );
};

export default FakeGrid;
