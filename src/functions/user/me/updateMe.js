import request from "superagent";
import url from "../../../app/url";

export default (data, ref, callback) => {
  const { app } = ref.props;
  const { users } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(url() + "/api/v1.0/users/me")
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text)
          enqueueSnackbar(res.text, {
            variant: "error"
          });
        else
          enqueueSnackbar("Error updating me , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error updating me",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (res.body._id === app.user._id) app.handleUpdateMe(res.body);

        if (users)
          users.forEach(u => {
            if (u._id === res.body._id)
              //Same one should be updated now
              payload.push(res.body);
            else payload.push(u);
          });
        else payload.push(res.body);
        app.handleUsersListLoad(payload);
        enqueueSnackbar("Profile updated", { variant: "info" });
        if (callback)
          return callback({
            error: false,
            message: "updated",
            user: res.body
          });
      }
    });
};
