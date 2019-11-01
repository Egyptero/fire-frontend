import request from "superagent";
import url from "../../../app/url";

export default (workflowId, ref, callback) => {
  console.log("Delete workflow");
  const { app } = ref.props;
  const { tenant, workflows } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(
      url() + "/api/v1.0/tenants/" + tenant._id + "/workflows/" + workflowId
    )
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleting workflow , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error deleting workflow item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        workflows.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleWorkflowsListLoad(payload);
        console.log("Workflow deleted and workflows are=>" + payload);
        enqueueSnackbar("Workflow deleted");
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            workflow: res.body
          });
      }
    });
};
