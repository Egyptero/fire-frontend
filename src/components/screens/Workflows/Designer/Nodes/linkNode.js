import joint from "jointjs/index";

export default (source, target) => {
  return new joint.shapes.standard.Link({
    source: source,
    target: target,
    root: {
      title: "Link"
    },
    attrs: {
      label: {
        text: "Yes"
      },
      line: {
        stroke: "#000000"
      }
    }
  });
};
