import highlightCell from "./highlightCell";
import addGraphCell from "./addGraphCell";

export default (cellView, evt, x, y, ref) => {
  console.log("Pointer Click down on paper ==========>");
  if (!ref.state.canSave) {
    evt.stopPropagation();
    return;
  }
  if (cellView === null) return addGraphCell(evt, x, y, ref);
  highlightCell(cellView, ref);
};
