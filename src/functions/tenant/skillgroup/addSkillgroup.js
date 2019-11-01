import request from "superagent";
import url from "../../../app/url";

export default (skillgroup, ref, callback) => {
  console.log("Adding new skillgroup");
  console.log(skillgroup);
  const { app } = ref.props;
  const { tenant, skillgroups } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/skillgroups")
    .set("x-auth-token", app.token)
    .send(skillgroup)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding skillgroup , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding skillgroup item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (skillgroups !== null) {
          skillgroups.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleSkillgroupsListLoad(payload);
        console.log("Skillgroup added and skillgroups are=>" + payload);
        enqueueSnackbar("Skillgroup added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            skillgroup: res.body
          });
      }
    });
};
