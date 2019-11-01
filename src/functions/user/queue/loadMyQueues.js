import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  console.log("Load my queues");
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  request
    .get(url() + "/api/v1.0/users/me/queues/summary")
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
        app.handleMyQueuesListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            queues: res.body
          });
      }
    });
};
