import joint from "jointjs";

export default (x, y, ivr) => {
  return new joint.shapes.standard.HeaderedRectangle({
    root: {
      title: "Ivr"
    },
    position: { x: x, y: y },
    size: { width: 180, height: 60 },
    attrs: {
      header: {
        fill: "#7F7F7F", //3F48CC
        stroke: "#7F7F7F"
      },
      body: {
        fill: "transparent",
        stroke: "#7F7F7F"
      },
      headerText: {
        text: "Send to ivr",
        fill: "#FFFFFF"
      },
      bodyText: {
        text: ivr,
        fill: "#000000"
      }
    }
  });
};
