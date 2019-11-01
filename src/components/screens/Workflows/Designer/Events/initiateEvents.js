import pointerClickInPaper from "../Events/pointerClickInPaper";
import deleteElement from "../Events/deleteElement";
import connectElement from "../Events/connectElement";
import settingsElement from "./settingsElement";

export default ref => {
  ref.paper.on("blank:pointerdown", (evt, x, y) =>
    pointerClickInPaper(null, evt, x, y, ref)
  );
  ref.paper.on("element:pointerdown", (cellView, evt, x, y) =>
    pointerClickInPaper(cellView, evt, x, y, ref)
  );
  ref.paper.on("element:delete", (elementView, evt) =>
    deleteElement(elementView, evt, ref)
  );
  ref.paper.on("element:connect", (elementView, evt) =>
    connectElement(elementView, evt, ref)
  );
  ref.paper.on("element:settings", (elementView, evt) =>
    settingsElement(elementView, evt, ref)
  );
  ref.paper.on("link:mouseenter", function(linkView) {
    if (!ref.state.canSave) return;
    linkView.showTools();
  });
  ref.paper.on("link:mouseleave", function(linkView) {
    if (!ref.state.canSave) return;
    linkView.hideTools();
  });
};
