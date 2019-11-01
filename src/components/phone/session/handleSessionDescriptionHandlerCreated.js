import updateCallSessionMedia from "./sessionmanager/updateCallSessionMedia";

export default (ref, sessionId, sdh) => {
  console.log("Phone: Call Session Description Handler Created");
  sdh.on("userMedia", stream => {});
  sdh.on("userMediaRequest", constraints => {});
  sdh.on("userMediaFailed", error => {});
  sdh.on("iceGathering", () => {});
  sdh.on("iceCandidate", candidate => {});
  sdh.on("iceGatheringComplete", () => {});
  sdh.on("iceConnection", () => {});
  sdh.on("iceConnectionChecking", () => {});
  sdh.on("iceConnectionConnected", () => {});
  sdh.on("iceConnectionCompleted", () => {});
  sdh.on("iceConnectionFailed", () => {});
  sdh.on("iceConnectionDisconnected", () => {});
  sdh.on("iceConnectionClosed", () => {});
  sdh.on("getDescription", sdpWrapper => {});
  sdh.on("setDescription", sdpWrapper => {});
  sdh.on("addStream", stream => {});
  sdh.on("addTrack", track => {});
};
