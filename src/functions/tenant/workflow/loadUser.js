import request from "superagent";
import url from "../../../app/url";

export default (workflowId, ref, callback) => {
  const { app } = ref.props;
  const { tenant, workflows } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading workflow id:" + workflowId);
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
    .get(url() + "/api/v1.0/tenants/" + tenant._id + "/workflows/" + workflowId)
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading workflow , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading workflow",
            sysmessage: res.body
          });
      } else {
        let payload = [];
        if (workflows) {
          workflows.forEach(workflow => {
            if (res.body._id === workflow._id) payload.push(res.body);
            else payload.push(workflow);
          });
        } else payload.push(res.body);
        app.handleWorkflowsListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            workflows: res.body
          });
      }
    });
};
