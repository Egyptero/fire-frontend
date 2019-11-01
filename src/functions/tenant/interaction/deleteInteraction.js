import request from "superagent";
import url from "../../../app/url";

export default (interactionId, ref, callback) => {
  console.log("Delete interaction");
  const { app } = ref.props;
  const { tenant, interactions } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(
      url() +
        "/api/v1.0/tenants/" +
        tenant._id +
        "/interactions/" +
        interactionId
    )
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleting interaction , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error deleting interaction item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        interactions.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleInteractionsListLoad(payload);
        console.log("Interaction deleted and interactions are=>" + payload);
        enqueueSnackbar("Interaction deleted");
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            interaction: res.body
          });
      }
    });
};
