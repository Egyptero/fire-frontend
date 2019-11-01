import handleSessionProgress from "../handleSessionProgress";
import handleSessionAccepted from "../handleSessionAccepted";
import handleSessionRejected from "../handleSessionRejected";
import handleSessionFailed from "../handleSessionFailed";
import handleSessionConnecting from "../handleSessionConnecting";
import handleSessionCancel from "../handleSessionCancel";
import handleSessionRefer from "../handleSessionRefer";
import handleSessionReferred from "../handleSessionReferred";
import handleSessionDTMF from "../handleSessionDTMF";
import handleSessionBye from "../handleSessionBye";
import handleSessionTrackAdded from "../handleSessionTrackAdded";
import handleSessionDescriptionHandlerCreated from "../handleSessionDescriptionHandlerCreated";

export default (ref, session) => {
  session.on("progress", response => {
    handleSessionProgress(ref, session.id, response);
  });
  session.on("trackAdded", () => {
    handleSessionTrackAdded(ref, session.id);
  });
  session.on("accepted", data => {
    handleSessionAccepted(ref, session.id, data);
  });
  session.on("rejected", (response, cause) => {
    handleSessionRejected(ref, session.id, response, cause);
  });
  session.on("failed", data => {
    handleSessionFailed(ref, session.id, data);
  });
  session.on("connecting", () => {
    handleSessionConnecting(ref, session.id);
  });
  session.on("cancel", () => {
    handleSessionCancel(ref, session.id);
  });
  session.on("refer", request => {
    handleSessionRefer(ref, session.id, request);
  });
  session.on("referred", (request, newSession) => {
    handleSessionReferred(ref, session.id, request, newSession);
  });
  session.on("dtmf", (dtmf, request) => {
    handleSessionDTMF(ref, session.id, dtmf, request);
  });
  session.on("bye", request => {
    handleSessionBye(ref, session.id, request);
  });
  session.on("SessionDescriptionHandler-created", sdh => {
    handleSessionDescriptionHandlerCreated(ref, session.id, sdh);
  });
};
