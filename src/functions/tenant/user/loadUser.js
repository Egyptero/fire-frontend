import request from "superagent";
import url from "../../../app/url";

export default (userId, ref, callback) => {
  const { app } = ref.props;
  const { tenant, users } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading user id:" + userId);
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
    .get(url() + "/api/v1.0/tenants/" + tenant._id + "/users/" + userId)
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading user , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading user",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (users) {
          users.forEach(user => {
            if (res.body._id === user._id) payload.push(res.body);
            else payload.push(user);
          });
        } else payload.push(res.body);
        app.handleUsersListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            users: res.body
          });
      }
    });
};
