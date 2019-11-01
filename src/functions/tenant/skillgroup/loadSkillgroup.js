import request from "superagent";
import url from "../../../app/url";

export default (skillgroupId, ref, callback) => {
  const { app } = ref.props;
  const { tenant, skillgroups } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading skillgroup id:" + skillgroupId);
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
    .get(url() + "/api/v1.0/tenants/" + tenant._id + "/skillgroups/" + skillgroupId)
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading skillgroup , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading skillgroup",
            sysmessage: res.body
          });
      } else {
        let payload = [];
        if (skillgroups) {
          skillgroups.forEach(skillgroup => {
            if (res.body._id === skillgroup._id) payload.push(res.body);
            else payload.push(skillgroup);
          });
        } else payload.push(res.body);
        app.handleSkillgroupsListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            skillgroups: res.body
          });
      }
    });
};
