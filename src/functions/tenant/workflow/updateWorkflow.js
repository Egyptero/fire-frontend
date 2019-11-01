import request from "superagent";
import url from "../../../app/url";

export default (workflowId, data, ref, callback) => {
  console.log("Update workflow");
  console.log("Update workflow data is:" + data);
  const { app } = ref.props;
  const { tenant, workflows } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(url() + "/api/v1.0/tenants/" + tenant._id + "/workflows/" + workflowId)
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating workflow , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error updating workflow item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        workflows.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleWorkflowsListLoad(payload);
        console.log("Workflow updated and workflows are=>" + payload);
        enqueueSnackbar("Workflow updated");
        if (callback)
          return callback({
            error: false,
            message: "updated",
            workflow: res.body
          });
      }
    });
};
