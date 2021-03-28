import joint from "jointjs";

export default (x, y, bot) => {
  return new joint.shapes.standard.HeaderedRectangle({
    root: {
      title: "Bot",
    },
    position: { x: x, y: y },
    size: { width: 180, height: 60 },
    attrs: {
      header: {
        fill: "#FF9800", //C00000
        stroke: "#FF9800",
      },
      body: {
        fill: "#FFB74D",
        stroke: "#FF9800",
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
        text: "Send to bot",
        fill: "#FFFFFF",
      },
      bodyText: {
        text: bot,
        fill: "#FFFFFF",
      },
    },
  });
};
