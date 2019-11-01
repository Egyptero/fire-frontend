import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  console.log("Load my teams");
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  request
    .get(url() + "/api/v1.0/users/me/teams")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading user teams , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading user teams",
            sysmessage: res.body
          });
      } else {
        app.handleMyTeamsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            teams: res.body
          });
      }
    });
};
