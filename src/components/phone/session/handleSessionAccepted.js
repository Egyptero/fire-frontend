import updateCallSessionMedia from "./sessionmanager/updateCallSessionMedia";
import updateCallSession from "./sessionmanager/updateCallSession";

export default (ref, sessionId, data) => {
  console.log("Phone: Call accepted");
  updateCallSession(ref, sessionId, "Talking");
  updateCallSessionMedia(ref, sessionId);
};
