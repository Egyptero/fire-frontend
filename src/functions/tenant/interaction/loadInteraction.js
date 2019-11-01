import request from "superagent";
import url from "../../../app/url";

export default (interactionId, ref, callback) => {
  const { app } = ref.props;
  const { tenant, interactions } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading interaction id:" + interactionId);
  if (!app.tenant) {
    if (callback) {
      return callback({
        error: true,
        message: "No tenant found"
      });
    }
    return;
  }
  request
    .get(
      url() +
        "/api/v1.0/tenants/" +
        tenant._id +
        "/interactions/" +
        interactionId
    )
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading interaction , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading interaction",
            sysmessage: res.body
          });
      } else {
        let payload = [];
        if (interactions) {
          interactions.forEach(interaction => {
            if (res.body._id === interaction._id) payload.push(res.body);
            else payload.push(interaction);
          });
        } else payload.push(res.body);
        app.handleInteractionsListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            interactions: res.body
          });
      }
    });
};
