import request from "superagent";
import url from "../../../app/url";

export default (skillgroupId, data, ref, callback) => {
  console.log("Update skillgroup");
  console.log("Update skillgroup data is:" + data);
  const { app } = ref.props;
  const { tenant, skillgroups } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(
      url() + "/api/v1.0/tenants/" + tenant._id + "/skillgroups/" + skillgroupId
    )
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating skillgroup , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error updating skillgroup item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        skillgroups.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleSkillgroupsListLoad(payload);
        console.log("Skillgroup updated and skillgroups are=>" + payload);
        enqueueSnackbar("Skillgroup updated");
        if (callback)
          return callback({
            error: false,
            message: "updated",
            skillgroup: res.body
          });
      }
    });
};
