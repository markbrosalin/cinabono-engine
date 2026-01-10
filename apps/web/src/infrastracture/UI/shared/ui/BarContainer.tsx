import { Component, JSX } from "solid-js";

interface BarContainerProps {
    class?: string;
    left?: JSX.Element;
    right?: JSX.Element;
    afterScroll?: JSX.Element;
    scrollRef?: (el: HTMLDivElement) => void;
    children?: JSX.Element;
}

export const BarContainer: Component<BarContainerProps> = (props) => {
    return (
        <div class={`flex flex-row h-10 w-full bg-gray-900 overflow-hidden ${props.class ?? ""}`}>
            {props.left && <div class="flex flex-shrink-0 items-center h-full">{props.left}</div>}

            <div class="relative flex-1 flex items-center overflow-x-hidden h-full">
                <div
                    ref={props.scrollRef}
                    class="flex items-center h-full overflow-x-auto scrollbar-hide"
                >
                    {props.children}
                </div>
                {props.afterScroll && (
                    <div class="flex flex-shrink-0 h-full items-center">{props.afterScroll}</div>
                )}
            </div>

            {props.right && <div class="flex flex-shrink-0 items-center h-full">{props.right}</div>}
        </div>
    );
};
