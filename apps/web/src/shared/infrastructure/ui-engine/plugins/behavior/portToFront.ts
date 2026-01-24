import type { UIEnginePlugin } from "../../model/types";

export const portToFrontPlugin: UIEnginePlugin = {
    name: "behavior:portToFront",
    apply(graph) {
        const onPortRendered = ({ selectors }: any) => {
            const port = selectors?.port;
            port?.setAttribute("style", "pointer-events: all;");
        };

        graph.on("port:rendered", onPortRendered);

        return () => {
            graph.off("port:rendered", onPortRendered);
        };
    },
};
