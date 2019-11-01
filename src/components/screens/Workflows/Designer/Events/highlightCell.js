import unhighlightCells from "./unhighlightCells";
export default (cell, ref) => {
  if (cell.model.isLink()) {
    console.log("trying to highlight link");
    return;
  }
  unhighlightCells(ref);

  let element = cell.model;
  element.attr({
    remove: {
      // pointerdown on the image SVG node will trigger the `element:delete` event
      cursor: "pointer",
      event: "element:delete",
      xlinkHref: "imgs/trash.png",
      width: 20,
      height: 20,
      x: -25,
      y: -25
    },
    connect: {
      // pointerdown on the image SVG node will trigger the `element:delete` event
      cursor: "pointer",
      event: "element:connect",
      xlinkHref: "imgs/connect.png",
      width: 20,
      height: 20,
      x: -25,
      y: 65
    },
    settings: {
      // pointerdown on the image SVG node will trigger the `element:delete` event
      cursor: "pointer",
      event: "element:settings",
      xlinkHref: "imgs/settings.png",
      width: 20,
      height: 20,
      x: -25,
      y: 20
    },
    select: {
      width: element.attributes.size.width + 10,
      height: element.attributes.size.height + 10,
      x: -5,
      y: -5,
      fill: "transparent",
      stroke: "lightblue",
      "stroke-dasharray": 2
    }
  });
};
