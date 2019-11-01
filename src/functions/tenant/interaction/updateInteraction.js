import request from "superagent";
import url from "../../../app/url";

export default (interactionId, data, ref, callback) => {
  console.log("Update interaction");
  console.log("Update interaction data is:" + data);
  const { app } = ref.props;
  const { tenant, interactions } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(
      url() +
        "/api/v1.0/tenants/" +
        tenant._id +
        "/interactions/" +
        interactionId
    )
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating interaction , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error updating interaction item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        interactions.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleInteractionsListLoad(payload);
        console.log("Interaction updated and interactions are=>" + payload);
        enqueueSnackbar("Interaction updated");
        if (callback)
          return callback({
            error: false,
            message: "updated",
            interaction: res.body
          });
      }
    });
};
