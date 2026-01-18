import { Graph } from "@antv/x6";

Graph.registerNode('buffer', {
    ''
})


//         const buffer = graph.addNode({
//             x: 0,
//             y: 0,
//             width: 66,
//             height: 34,
//             markup: [
//                 {
//                     tagName: "g",
//                     children: [
//                         { tagName: "rect", selector: "body" },
//                         {
//                             tagName: "g",
//                             selector: "icon",
//                             children: [
//                                 { tagName: "path", selector: "lines" },
//                                 { tagName: "path", selector: "tri" },
//                             ],
//                         },
//                     ],
//                 },
//             ],
//             attrs: {
//                 body: {
//                     rx: 4,
//                     ry: 4,
//                     fill: "#fff",
//                     stroke: "#3B4251",
//                     strokeWidth: 2,
//                 },
//                 lines: {
//                     d: "M -16,0 L -8,0 M 9,0 L 17,0",
//                     stroke: "#829CC2",
//                     strokeWidth: 2,
//                     strokeLinecap: "round",
//                     refX: "50%",
//                     refY: "50%",
//                 },
//                 tri: {
//                     d: "M16.598 9.195C17.245 9.584 17.245 10.523 16.598 10.911L1.515 19.961C0.848 20.361 0 19.881 0 19.104L0 1.003C0 0.226 0.848 -0.254 1.515 0.146L16.598 9.195Z",
//                     stroke: "#829CC2",
//                     strokeWidth: 2,
//                     strokeLinejoin: "round",
//                     fill: "none",
//                     refX: "50%",
//                     refY: "50%",
//                     transform: "translate(-8,-10)",
//                 },
//             },
//             ports: {
//                 items: [
//                     { id: "input_1", group: "left" },
//                     { id: "output_2", group: "right" },
//                 ],
//                 groups: {
//                     left: {
//                         position: {
//                             name: "left",
//                         },
//                         attrs: {
//                             circle: {
//                                 r: 5,
//                                 stroke: "#3B4251",
//                                 fill: "#A4B7D2",
//                                 strokeWidth: 2,
//                                 magnet: true,
//                             },
//                         },
//                     },
//                     right: {
//                         position: {
//                             name: "right",
//                         },
//                         attrs: {
//                             circle: {
//                                 magnet: true,
//                                 r: 5,
//                                 stroke: "#3B4251",
//                                 fill: "#A4B7D2",
//                                 strokeWidth: 2,
//                             },
//                         },
//                     },
//                 },
//             },
//         });