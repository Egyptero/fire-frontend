import removeCallSession from "./sessionmanager/removeCallSession";
import updateCallSession from "./sessionmanager/updateCallSession";

export default (ref, sessionId) => {
  console.log("Phone: Call Cancel");
  updateCallSession(ref, sessionId, "Cancelled");
  setTimeout(() => {
    removeCallSession(ref, sessionId);
  }, 2000);
};
