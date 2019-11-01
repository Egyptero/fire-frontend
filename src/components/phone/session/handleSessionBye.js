import removeCallSession from "./sessionmanager/removeCallSession";

export default (ref, sessionId, request) => {
  console.log("Phone: Call bye");
  removeCallSession(ref, sessionId);
};
