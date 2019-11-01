import request from "superagent";
import url from "../../../app/url";

export default (interaction, ref, callback) => {
  console.log("Adding new interaction");
  console.log(interaction);
  const { app } = ref.props;
  const { tenant, interactions } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/interactions")
    .set("x-auth-token", app.token)
    .send(interaction)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding interaction , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding interaction item",
            sysmessage: res && res.text ? res.text : "Error adding interaction"
          });
      } else {
        let payload = [];
        interactions.forEach(u => {
          payload.push(u);
        });
        payload.push(res.body);

        app.handleInteractionsListLoad(payload);
        console.log("Interaction added and interactions are=>" + payload);
        enqueueSnackbar("Interaction added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            interaction: res.body
          });
      }
    });
};
