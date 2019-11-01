import updateCallSessionMedia from "./sessionmanager/updateCallSessionMedia";

export default (ref, sessionId) => {
  console.log("Phone: Call track added ...");
  updateCallSessionMedia(ref, sessionId);
};
