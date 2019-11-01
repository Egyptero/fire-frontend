import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  console.log("Load my skillgroups");
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
      url() + "/api/v1.0/users/me/tenants/" + app.tenant._id + "/skillgroups"
    )
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading user skillgroups , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading user skillgroups",
            sysmessage: res && res.text ? res.text : "error"
          });
      } else {
        app.handleMySkillgroupsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            skillgroups: res.body
          });
      }
    });
};
