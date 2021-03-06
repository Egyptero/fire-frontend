import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading customers");
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
    .get(url() + "/api/v1.0/tenants/" + app.tenant._id + "/customers")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading customers list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading customers list",
            sysmessage: res.body
          });
      } else {
        app.handleCustomersListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            customers: res.body
          });
      }
    });
};
