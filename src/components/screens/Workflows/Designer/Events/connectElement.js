import linkNode from "../Nodes/linkNode";
import $ from "jquery";
import addLinkTools from "./addLinkTools";
export default (elementView, evt, ref) => {
  // Stop any further actions with the element view e.g. dragging
  if (evt.type === "mousedown") {
    evt.preventDefault();
    evt.stopPropagation();
    console.log("Connect element mouse down");
    let link = linkNode({ id: elementView.model.id });
    link.router("orthogonal");
    ref.graph.addCell(link);
    link.label(0, {
      attrs: {
        text: {
          text: ""
        }
      }
    });
    let linkView = addLinkTools(link, ref);
    // initiate the linkView arrowhead movement
    linkView.startArrowheadMove("target");

    $(document).on(
      {
        "mousemove.link": onDrag,
        "mouseup.link": onDragEnd
      },
      {
        // shared data between listeners
        view: linkView,
        paper: ref.paper
      }
    );

    function onDrag(evt) {
      // transform client to paper coordinates
      var p = evt.data.paper.snapToGrid({
        x: evt.clientX,
        y: evt.clientY
      });
      // manually execute the linkView mousemove handler
      evt.data.view.pointermove(evt, p.x, p.y);
    }

    function onDragEnd(evt) {
      // manually execute the linkView mouseup handler
      evt.data.view.pointerup(evt);
      $(document).off(".link");
    }
  }
};
