import request from "superagent";
import url from "../../../app/url";

export default (skillgroupId, ref, callback) => {
  console.log("Delete skillgroup");
  const { app } = ref.props;
  const { tenant, skillgroups } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(
      url() + "/api/v1.0/tenants/" + tenant._id + "/skillgroups/" + skillgroupId
    )
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleting skillgroup , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error deleting skillgroup item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        skillgroups.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleSkillgroupsListLoad(payload);
        console.log("Skillgroup deleted and skillgroups are=>" + payload);
        enqueueSnackbar("Skillgroup deleted");
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            skillgroup: res.body
          });
      }
    });
};
