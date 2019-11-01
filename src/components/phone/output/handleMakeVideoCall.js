import addCallSession from "../session/sessionmanager/addCallSession";

export default (ref, extension) => {
  console.log("Phone: Make Video Call Request to extension:" + extension);
  const { sipUA } = ref.state;
  const session = sipUA.invite(extension, {
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: {
          optional: [
            { googEchoCancellation: true },
            { googAutoGainControl: true },
            { googNoiseSuppression: true },
            { googHighpassFilter: true },
            { googAudioMirroring: false },
            { googNoiseSuppression2: true },
            { googEchoCancellation2: true },
            { googAutoGainControl2: true },
            { googDucking: false }
          ]
        },
        video: true
      }
    }
    //inviteWithoutSdp: true
  });
  addCallSession(ref, session, "Calling");
};
