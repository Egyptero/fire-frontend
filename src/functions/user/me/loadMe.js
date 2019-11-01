import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { users } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading me....");
  // if (!app.tenant) {
  //   if (callback) {
  //     return callback({
  //       error: true,
  //       message: "No tenant found"
  //     });
  //   }
  //   return;
  // }
  request
    .get(url() + "/api/v1.0/users/me")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading me , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading me",
            sysmessage: res && res.text ? res.text : "error"
          });
      } else {
        app.handleUpdateMe(res.body);
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
