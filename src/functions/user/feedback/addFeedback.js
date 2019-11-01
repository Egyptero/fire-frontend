import request from "superagent";
import url from "../../../app/url";

export default (feedback, ref, callback) => {
  const { app } = ref.props;
  const { myFeedbacks } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/users/me/feedbacks")
    .set("x-auth-token", ref.props.app.token)
    .send(feedback)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error adding feedback , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error adding feedback",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (myFeedbacks !== null) {
          myFeedbacks.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleMyFeedbackListLoad(payload);
        enqueueSnackbar("Feedback added", { variant: "info" });
        if (callback)
          return callback({
            error: false,
            message: "added",
            todo: res.body
          });
      }
    });
};
