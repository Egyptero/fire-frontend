import joint from "jointjs/index";

export default (x, y, skill) => {
  return new joint.shapes.standard.HeaderedRectangle({
    root: {
      title: "Queue"
    },
    position: { x: x, y: y },
    size: { width: 180, height: 60 },
    attrs: {
      header: {
        fill: "#2196F3",
        stroke: "#2196F3"
      },
      body: {
        fill: "#64B5F6", //EFE5B0 
        stroke: "#2196F3",
        filter: {
          name: "dropShadow",
          args: {
            dx: 2,
            dy: 2,
            blur: 3,
          },
        },

      },
      headerText: {
        text: "Queue to skill",
        fill: "#FFFFFF"
      },
      bodyText: {
        text: skill,
        fill: "#FFFFFF"
      }
    }
  });
};
