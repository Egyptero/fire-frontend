import joint from "jointjs";

export default (x, y, routing) => {
  return new joint.shapes.standard.HeaderedRectangle({
    root: {
      title: "Routing"
    },
    position: { x: x, y: y },
    size: { width: 180, height: 60 },
    attrs: {
      header: {
        fill: "#7F7F7F", //1B893C
        stroke: "#7F7F7F"
      },
      body: {
        fill: "transparent", //C3C3C3
        stroke: "#7F7F7F",
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
        text: "Send to routing",
        fill: "#FFFFFF"
      },
      bodyText: {
        text: routing,
        fill: "#000000"
      }
    }
  });
};
