import joint from "jointjs";

export default (x, y, bot) => {
  return new joint.shapes.standard.HeaderedRectangle({
    root: {
      title: "Bot"
    },
    position: { x: x, y: y },
    size: { width: 180, height: 60 },
    attrs: {
      header: {
        fill: "#7F7F7F", //C00000
        stroke: "#7F7F7F"
      },
      body: {
        fill: "transparent",
        stroke: "#7F7F7F"
      },
      headerText: {
        text: "Send to bot",
        fill: "#FFFFFF"
      },
      bodyText: {
        text: bot,
        fill: "#000000"
      }
    }
  });
};
