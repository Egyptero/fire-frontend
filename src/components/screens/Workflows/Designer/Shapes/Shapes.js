import joint from "jointjs/index";

joint.dia.Element.define(
  "standard.Circle",
  {
    attrs: {
      body: {
        fill: "#ffffff",
        stroke: "#000000",
        refR: "50%",
        refCx: "50%",
        refCy: "50%",
        refWidth: "50%",
        refHeight: "50%"
      },

      label: {
        textVerticalAnchor: "middle",
        textAnchor: "middle",
        refX: "50%",
        refY: "50%",
        fontSize: 14,
        fill: "#000000"
      },
      select: {},
      remove: {},
      connect: {}
      //settings: {}
    }
  },
  {
    markup: [
      {
        tagName: "circle",
        selector: "body"
      },
      {
        tagName: "text",
        selector: "label"
      },
      {
        tagName: "rect",
        selector: "select"
      },
      {
        tagName: "image",
        selector: "remove"
      },
      {
        tagName: "image",
        selector: "connect"
      }
      // {
      //   tagName: "image",
      //   selector: "settings"
      // }
    ]
  }
);

joint.dia.Element.define(
  "standard.HeaderedRectangle",
  {
    attrs: {
      body: {
        fill: "#ffffff",
        stroke: "#000000",
        refWidth: "100%",
        refHeight: "100%"
      },
      bodyText: {
        textVerticalAnchor: "middle",
        textAnchor: "middle",
        refX: "50%",
        refY: "70%",
        fontSize: 14,
        fill: "#000000"
      },
      header: {
        fill: "#ffffff",
        stroke: "#000000",
        refWidth: "100%",
        refHeight: "40%"
      },
      headerText: {
        textVerticalAnchor: "middle",
        textAnchor: "middle",
        refX: "50%",
        refY: "20%",
        fontSize: 14,
        fill: "#000000"
      },
      select: {},
      remove: {},
      connect: {},
      settings: {}
    }
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body"
      },
      {
        tagName: "text",
        selector: "bodyText"
      },
      {
        tagName: "rect",
        selector: "header"
      },
      {
        tagName: "text",
        selector: "headerText"
      },
      {
        tagName: "image",
        selector: "remove"
      },
      {
        tagName: "rect",
        selector: "select"
      },
      {
        tagName: "image",
        selector: "connect"
      },
      {
        tagName: "image",
        selector: "settings"
      }
    ]
  }
);

joint.dia.Element.define(
  "standard.Rectangle",
  {
    attrs: {
      body: {
        fill: "#ffffff",
        stroke: "#000000",
        refWidth: "100%",
        refHeight: "100%"
      },
      bodyText: {
        textVerticalAnchor: "middle",
        textAnchor: "middle",
        refX: "50%",
        refY: "50%",
        fontSize: 14,
        fill: "#000000"
      },
      select: {},
      remove: {},
      connect: {},
      settings: {}
    }
  },
  {
    markup: [
      {
        tagName: "rect",
        selector: "body"
      },
      {
        tagName: "text",
        selector: "bodyText"
      },
      {
        tagName: "rect",
        selector: "header"
      },
      {
        tagName: "text",
        selector: "headerText"
      },
      {
        tagName: "image",
        selector: "remove"
      },
      {
        tagName: "rect",
        selector: "select"
      },
      {
        tagName: "image",
        selector: "connect"
      },
      {
        tagName: "image",
        selector: "settings"
      }
    ]
  }
);

joint.dia.Element.define(
  "standard.Polygon",
  {
    attrs: {
      body: {
        fill: "#ffffff",
        stroke: "#000000"
      },

      label: {
        textVerticalAnchor: "middle",
        textAnchor: "middle",
        refX: "50%",
        refY: "50%",
        fontSize: 14,
        fill: "#000000"
      },
      select: {},
      remove: {},
      connect: {},
      settings: {}
    }
  },
  {
    markup: [
      {
        tagName: "polygon",
        selector: "body"
      },
      {
        tagName: "text",
        selector: "label"
      },
      {
        tagName: "rect",
        selector: "select"
      },
      {
        tagName: "image",
        selector: "remove"
      },
      {
        tagName: "image",
        selector: "connect"
      },
      {
        tagName: "image",
        selector: "settings"
      }
    ]
  }
);