export default (ref, interactionId) => {
  //Ref is the app component. this not the sharedapp. You can setState direct
  console.log("ODI: We should Accept interaction with id:" + interactionId);
  const { client } = ref.state;
  if (client) {
    client.emit("message", {
      action: "accept",
      date: Date.now(),
      token: ref.state.token,
      interactionId
    });
  } else
    ref.props.enqueueSnackbar(
      "You are not connected to the ODI. Please login",
      {
        variant: "error"
      }
    );
};
