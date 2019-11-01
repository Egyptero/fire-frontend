import joint from "jointjs/index";
import settingsElement from "./settingsElement";
export default (link, ref) => {
  console.log("add link tools is invoked");
  if (link) {
    return buildLinkTools(link, ref, false);
  } else {
    let links = ref.graph.getLinks();
    links.forEach(lnk => {
      buildLinkTools(lnk, ref, true);
    });
  }
};

const buildLinkTools = (link, ref, hide) => {
  let linkView = ref.paper.findViewByModel(link);
  if (!linkView) return;
  let verticesTool = new joint.linkTools.Vertices();
  let targetArrowheadTool = new joint.linkTools.TargetArrowhead();
  let boundaryTool = new joint.linkTools.Boundary();
  let removeButton = new joint.linkTools.Remove();
  let settingButton = buildLinkSettingTool(ref);
  var toolsView = new joint.dia.ToolsView({
    tools: [
      verticesTool,
      targetArrowheadTool,
      boundaryTool,
      removeButton,
      settingButton
    ]
  });
  linkView.addTools(toolsView);
  if (hide) linkView.hideTools();
  return linkView;
};

const buildLinkSettingTool = ref => {
  return new joint.linkTools.Button({
    markup: [
      {
        tagName: "circle",
        selector: "button",
        attributes: {
          r: 7,
          fill: "#001DFF",
          cursor: "pointer"
        }
      },
      {
        tagName: "path",
        selector: "icon",
        attributes: {
          d: "M -2 4 2 4 M 0 3 0 0 M -2 -1 1 -1 M -1 -4 1 -4",
          fill: "none",
          stroke: "#FFFFFF",
          "stroke-width": 2,
          "pointer-events": "none"
        }
      }
    ],
    distance: 20,
    offset: 0,
    action: function(evt) {
      settingsElement(this, evt, ref);
    }
  });
};
