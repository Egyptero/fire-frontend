import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading skillgroups");
  if (!app.tenant) {
    if (callback) {
      return callback({
        error: true,
        message: "No tenant found"
      });
    }
    return;
  }
  request
    .get(url() + "/api/v1.0/tenants/" + app.tenant._id + "/skillgroups")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else
          enqueueSnackbar("Error loading skillgroups list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading skillgroups list",
            sysmessage: res.body
          });
      } else {
        app.handleSkillgroupsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            skillgroups: res.body
          });
      }
    });
};
