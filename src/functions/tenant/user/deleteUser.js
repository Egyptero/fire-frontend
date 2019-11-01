import request from "superagent";
import url from "../../../app/url";

export default (userId, ref, callback) => {
  console.log("Delete user");
  const { app } = ref.props;
  const { tenant, users } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(url() + "/api/v1.0/tenants/" + tenant._id + "/users/" + userId)
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleting user , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error deleting user item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        users.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleUsersListLoad(payload);
        console.log("User deleted and users are=>" + payload);
        enqueueSnackbar("User deleted");
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            user: res.body
          });
      }
    });
};
