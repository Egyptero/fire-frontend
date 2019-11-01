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
        fill: "#7F7F7F",
        stroke: "#7F7F7F"
      },
      body: {
        fill: "transparent", //EFE5B0
        stroke: "#7F7F7F"
      },
      headerText: {
        text: "Queue to skill",
        fill: "#FFFFFF"
      },
      bodyText: {
        text: skill,
        fill: "#000000"
      }
    }
  });
};
