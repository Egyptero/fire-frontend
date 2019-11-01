import request from "superagent";
import url from "../../app/url";

export default (ref, email) => {
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/requestreset/" + email)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else
          enqueueSnackbar(
            "Error sending password reset message , please try again"
          );
        return;
      } else {
        enqueueSnackbar("Password reset email sent, please check your email.");
      }
    });
};
