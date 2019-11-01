import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  request
    .get(url() + "/api/v1.0/users/me/feedbacks")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading feedback list , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading feedback list",
            sysmessage: res.body
          });
      } else {
        app.handleMyFeedbackListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            todos: res.body
          });
      }
    });
};
