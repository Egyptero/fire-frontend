import removeCallSession from "./sessionmanager/removeCallSession";

export default (ref, sessionId, data) => {
  console.log("Phone: Call failed");
  console.log(data);
  removeCallSession(ref, sessionId);
};
