import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  console.log("Load my Email queues");
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  if (!app.tenant) {
    if (callback)
      callback({
        error: true,
        message: "No tenant loaded yet",
        sysmessage: "No tenant found"
      });
    return;
  }

  request
    .get(
      url() +
        "/api/v1.0/users/me/tenants/" +
        app.tenant._id +
        "/queues/email/details"
    )
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading user queues , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading user queues",
            sysmessage: res && res.text ? res.text : "error"
          });
      } else {
        app.handleMyEmailQueuesDetailsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            queues: res.body
          });
      }
    });
};
