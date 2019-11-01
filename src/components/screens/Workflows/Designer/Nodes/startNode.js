import joint from "jointjs/index";

export default (x, y) => {
  return new joint.shapes.standard.Circle({
    root: {
      title: "Start"
    },
    position: { x: x, y: y },
    size: { width: 60, height: 60 },
    cursor: "hand",
    attrs: {
      body: {
        fill: "transparent",
        stroke: "#000078"
      },
      label: {
        text: "Start",
        fill: "#000078"
      }
    }
  });
};
