export default (ref, data) => {
  console.log("ODI: Connected Event");
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
