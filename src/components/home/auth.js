import request from "superagent";
import url from "../../app/url";

export default ref => {
  const { enqueueSnackbar } = ref.props;

  if (!ref.state.email) {
    enqueueSnackbar("Email is missing");
    return ref.setState({ error: "Email is missing", disabled: false });
  }
  if (!ref.state.password) {
    enqueueSnackbar("Password is missing");
    return ref.setState({ error: "Please enter password", disabled: false });
  }
  ref.setState({ disabled: true, error: "" });
  request
    .post(url() + "/api/v1.0/auth")
    .set("Access-Control-Allow-Origin", "*")
    .send({ email: ref.state.email, password: ref.state.password })
    .end((err, res) => {
      if (err) {
        let error = "Failed to login ... please try again";
        if (res && res.text) error = res.text;
        ref.setState({ error: error, disabled: false });
        enqueueSnackbar(error);
        return;
      } else {
        ref.props.app.onLogin({
          token: res.body.token,
          user: res.body.data
        });
        //console.log(res.body.data);

        if (res.body.data.accountStatus === "Pending")
          ref.handleVerifyRequest();
        else if (res.body.data.accountStatus === "Suspended")
          ref.handleSuspendRequest();
        else if (res.body.data.accountStatus === "Archived")
          ref.handleArchivedRequest();
        else if (res.body.data.accountStatus === "Inactive")
          ref.handleInactiveRequest();
      }
    });
};
