import startNode from "../Nodes/startNode";
import stopNode from "../Nodes/stopNode";
import queueNode from "../Nodes/queueNode";
import conditionNode from "../Nodes/conditionNode";
import botNode from "../Nodes/botNode";
import ivrNode from "../Nodes/ivrNode";
import routingNode from "../Nodes/routingNode";
import executeNode from "../Nodes/executeNode";
import unhighlightCells from "./unhighlightCells";
/*
 * In this method , we add a new cell to Graph based on user selection from the left tools box.
 * In case user selected the start element , then the function will add the start cell to the graph
 */
export default (evt, x, y, ref) => {
  const { selectedAction } = ref.state;
  x -= 30;
  y -= 30;
  unhighlightCells(ref);
  let element = null;
  switch (selectedAction) {
    case "Cursor":
      break;
    case "Start":
      element = startNode(x, y);
      break;
    case "Stop":
      element = stopNode(x, y);
      break;
    case "Condition":
      element = conditionNode(x, y);
      break;
    case "Queue": //Route
      element = queueNode(x, y);
      break;
    case "Bot":
      element = botNode(x, y);
      break;
    case "Execute":
      element = executeNode(x, y);
      break;
    case "IVR":
      element = ivrNode(x, y);
      break;
    case "Routing":
      element = routingNode(x, y);
      break;
    case "Menu": //IVR
      console.log("Menu element");
      break;
    case "Input": //IVR
      console.log("Input element");
      break;
    case "Output": //IVR
      console.log("Output element");
      break;
    case "Terminate": //IVR
      console.log("Terminate element");
      break;
    case "Wit": //Bot
      console.log("Wit element");
      break;
    case "Watson": //Bot
      console.log("Watson element");
      break;
    case "Speak": //Bot
      console.log("Speak element");
      break;
    default:
      break;
  }
  if (element) ref.graph.addCell(element);
};
