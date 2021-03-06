import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading interactions");
  if (!app.tenant) {
    if (callback) {
      return callback({
        error: true,
        message: "No tenant found"
      });
    }
    return;
  }
  console.log("Loading tenant now and let us check the url");
  request
    .get(url() + "/api/v1.0/tenants/" + app.tenant._id + "/interactions")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else
          enqueueSnackbar("Error loading interactions list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading interactions list",
            sysmessage: res.body
          });
      } else {
        app.handleInteractionsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            interactions: res.body
          });
      }
    });
};
