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
        fill: "#81C784",//transparent
        stroke: "#4EAC50",//
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
        text: "Start",
        fill: "#FFFFFF"
      }
    }
  });
};
