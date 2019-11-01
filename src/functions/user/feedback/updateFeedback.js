import request from "superagent";
import url from "../../../app/url";

export default (feedbackId, data, ref, callback) => {
  const { app } = ref.props;
  const { myFeedbacks } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .put(url() + "/api/v1.0/users/me/feedbacks/" + feedbackId)
    .set("x-auth-token", ref.props.app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error updating feedback , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error updating feedback",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        myFeedbacks.forEach(u => {
          if (u._id === res.body._id) payload.push(res.body);
          else payload.push(u);
        });
        app.handleMyFeedbacksListLoad(payload);
        enqueueSnackbar("Feedback updated", { variant: "info" });
        if (callback)
          return callback({
            error: false,
            message: "updated",
            todo: res.body
          });
      }
    });
};
