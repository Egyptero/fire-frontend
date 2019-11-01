import request from "superagent";
import url from "../../app/url";

export default ref => {
  const { enqueueSnackbar, app } = ref.props;
  request
    .post(url() + "/api/v1.0/verify")
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else
          enqueueSnackbar(
            "Error sending verification message , please try again"
          );
        return;
      } else {
        enqueueSnackbar("Verification email sent, please check your email.");
      }
    });
};
