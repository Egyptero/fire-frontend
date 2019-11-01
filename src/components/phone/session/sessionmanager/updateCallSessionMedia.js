export default (ref, sessionId) => {
  console.log("Phone: Update Call Session Media");
  let { myCalls } = ref.state;
  //Step 1 copy the myCalls into PayLoad
  let payload = [];
  if (myCalls) {
    myCalls.forEach(myCall => {
      if (myCall.session.id === sessionId) {
        myCall.localStream = new MediaStream();
        myCall.remoteStream = new MediaStream();
        if (myCall.session.sessionDescriptionHandler) {
          let pc = myCall.session.sessionDescriptionHandler.peerConnection;
          pc.getReceivers().forEach(function(receiver) {
            if (receiver.track) myCall.remoteStream.addTrack(receiver.track);
          });

          pc.getSenders().forEach(function(sender) {
            if (sender.track) myCall.localStream.addTrack(sender.track);
          });
        }
      }
      payload.push(myCall);
    });
    ref.setState({ myCalls: payload });
  }
};
