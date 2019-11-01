import request from "superagent";
import url from "../../../app/url";

export default (workflow, ref, callback) => {
  console.log("Adding new workflow");
  console.log(workflow);
  const { app } = ref.props;
  const { tenant, workflows } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/workflows")
    .set("x-auth-token", app.token)
    .send(workflow)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding workflow , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding workflow item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (workflows !== null) {
          workflows.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleWorkflowsListLoad(payload);
        console.log("Workflow added and workflows are=>" + payload);
        enqueueSnackbar("Workflow added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            workflow: res.body
          });
      }
    });
};
