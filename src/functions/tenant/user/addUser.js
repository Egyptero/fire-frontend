import request from "superagent";
import url from "../../../app/url";

export default (user, ref, callback) => {
  console.log("Adding new user");
  console.log(user);
  const { app } = ref.props;
  const { tenant, users } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/users")
    .set("x-auth-token", app.token)
    .send(user)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding user , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding user item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (users !== null) {
          users.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleUsersListLoad(payload);
        console.log("User added and users are=>" + payload);
        enqueueSnackbar("User added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            user: res.body
          });
      }
    });
};
