import updateCallSession from "./sessionmanager/updateCallSession";

export default (ref, sessionId, response, cause) => {
  console.log("Phone: Call rejected");
  console.log(response);
  console.log(cause);
  updateCallSession(ref, sessionId, "Busy");
};
