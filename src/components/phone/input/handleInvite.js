import addCallSession from "../session/sessionmanager/addCallSession";
export default (ref, session) => {
  console.log("Phone: New session invite is received >>>>");
  addCallSession(ref, session, "Invite");
};
