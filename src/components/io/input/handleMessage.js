/* eslint-disable react/react-in-jsx-scope */
export default (ref, data) => {
  switch (data.action) {
    case "login":
      console.log("ODI: Login message",data);
      updateAppState(ref, data);
      break;
    case "logout":
      console.log("ODI: Logout message",data);
      updateAppState(ref, data);
      break;
    case "state":
      console.log("ODI: New state message", data);
      updateAppState(ref, data);
      break;
    case "addinteraction":
      console.log("ODI: New add interaction message",data);
      updateMyInteractions(ref, data, true, true);
      if (ref.state.screen !== "My work") ref.handleScreenChange("My work");
      break;
    case "updateinteraction":
      console.log("ODI: Update interaction message");
      updateMyInteractions(ref, data, false, true);
      if (ref.state.screen !== "My work") ref.handleScreenChange("My work");
      break;
    case "removeinteraction":
      console.log("ODI: Remove interaction message");
      updateMyInteractions(ref, data, false, false);
      if (
        ref.state.screen === "My work" &&
        (!ref.myInteractions || ref.myInteractions.length === 0)
      )
        ref.handleScreenChange("Dashboard");
      break;
    default:
      break;
  }
};

const updateMyInteractions = (ref, data, offer, update) => {
  let myInteractions = ref.state.myInteractions;
  let user = ref.state.user;

  if (user) user.interactionIds = { ...data.interactionIds };
  if (!myInteractions) myInteractions = [];

  myInteractions.forEach((myInteraction, index) => {
    if (
      myInteraction.interaction._id === data.interactionDetails.interaction._id
    )
      myInteractions.splice(index, 1);
  });
  if (update) myInteractions.push(data.interactionDetails);
  ref.setState({
    myInteractions,
    user,
    myInteraction: update ? data.interactionDetails : null,
  });
  if (offer) ref.offerInteraction(data.interactionDetails);
};

const updateAppState = (ref, data) => {
  ref.setState({
    buttons: {
      login: data.buttons.login,
      logout: data.buttons.logout,
      ready: data.buttons.ready,
      notready: data.buttons.notready,
      wrapup: data.buttons.wrapup,
    },
    status: data.status,
    nextStatus: data.nextStatus,
    inStateTime: data.inStateTime,
  });
};
