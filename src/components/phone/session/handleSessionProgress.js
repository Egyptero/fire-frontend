import updateCallSession from "./sessionmanager/updateCallSession";

export default (ref, sessionId, response) => {
  console.log("Phone: Call in progress");
  updateCallSession(ref, sessionId, "Calling");
};
