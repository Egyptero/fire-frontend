import request from "superagent";
import url from "../../app/url";
import verify from "./verify";

export default (user, ref) => {
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/users")
    .send({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      username: user.username,
      receiveUpdates: user.receiveUpdates
    })
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error registering user , please try again");
        return;
      } else {
        enqueueSnackbar("Account created");
        console.log(res.body);
        ref.props.app.onLogin({
          token: res.body.token,
          user: res.body.data
        });
        if (res.body.data.accountStatus === "Pending")
          ref.props.handleVerifyRequest();
        else if (res.body.data.accountStatus === "Suspended")
          ref.props.handleSuspendRequest();
        else if (res.body.data.accountStatus === "Archived")
          ref.handleArchivedRequest();
        else if (res.body.data.accountStatus === "Inactive")
          ref.handleInactiveRequest();
      }
    });
};
