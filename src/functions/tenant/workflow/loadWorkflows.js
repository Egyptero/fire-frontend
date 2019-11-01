import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading workflows");
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
    .get(url() + "/api/v1.0/tenants/" + app.tenant._id + "/workflows")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading workflows list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading workflows list",
            sysmessage: res.body
          });
      } else {
        app.handleWorkflowsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            workflows: res.body
          });
      }
    });
};
