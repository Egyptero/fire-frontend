import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading users");
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
    .get(url() + "/api/v1.0/tenants/" + app.tenant._id + "/users")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading users list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading users list",
            sysmessage: res.text
          });
      } else {
        app.handleUsersListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            users: res.body
          });
      }
    });
};
