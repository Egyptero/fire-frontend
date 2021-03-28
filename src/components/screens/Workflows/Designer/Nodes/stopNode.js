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
        fill: "#E57373",
        stroke: "#F44336",
        filter: {
          name: "dropShadow",
          args: {
            dx: 2,
            dy: 2,
            blur: 3,
          },
        },

      },
      label: {
        text: "Stop",
        fill: "#FFFFFF"
      }
    }
  });
};
