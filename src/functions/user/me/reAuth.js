import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { users } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Reauthenticate....");
  request
    .post(url() + "/api/v1.0/users/me")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar(
            "Error re-authenticate , please logout and login again",
            {
              variant: "error"
            }
          );
        if (callback)
          return callback({
            error: true,
            message: "error re-authenticate",
            sysmessage: res && res.text ? res.text : "error"
          });
      } else {
        //
        app.handleUpdateMe(res.body.data);
        app.handleUpdateToken(res.body.token);
        let payload = [];
        if (users) {
          users.forEach(user => {
            if (res.body.data._id === user._id) payload.push(res.body.data);
            else payload.push(user);
          });
        } else payload.push(res.body.data);
        app.handleUsersListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "Updated",
            user: res.body.data,
            token: res.body.token
          });
      }
    });
};
