import joint from "jointjs/index";

export default (x, y) => {
  return new joint.shapes.standard.Circle({
    root: {
      title: "Stop"
    },
    position: { x: x, y: y },
    size: { width: 60, height: 60 },
    attrs: {
      body: {
        fill: "transparent",
        stroke: "#C80000"
      },
      label: {
        text: "Stop",
        fill: "#C80000"
      }
    }
  });
};
