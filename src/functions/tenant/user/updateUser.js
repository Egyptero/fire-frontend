import request from "superagent";
import url from "../../../app/url";

export default (userId, data, ref, callback) => {
  console.log("Update user");
  console.log("Update user data is:" + data);
  const { app } = ref.props;
  const { tenant, users } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(url() + "/api/v1.0/tenants/" + tenant._id + "/users/" + userId)
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating user , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error updating user item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        console.log("Check if same main user");
        console.log(res.body);
        console.log(app.user);
        if (res.body._id === app.user._id) app.handleUpdateMe(res.body);

        users.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleUsersListLoad(payload);
        console.log("User updated and users are=>" + payload);
        enqueueSnackbar("User updated");
        if (callback)
          return callback({
            error: false,
            message: "updated",
            user: res.body
          });
      }
    });
};
