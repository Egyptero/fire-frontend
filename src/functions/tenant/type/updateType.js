import request from "superagent";
import url from "../../../app/url";

export default (typeId, data, ref, callback) => {
  console.log("Update type");
  console.log("Update type data is:" + data);
  const { app } = ref.props;
  const { tenant, types } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(url() + "/api/v1.0/tenants/" + tenant._id + "/types/" + typeId)
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating type , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error updating type item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        types.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleTypesListLoad(payload);
        console.log("Type updated and types are=>" + payload);
        enqueueSnackbar("Type updated");
        if (callback)
          return callback({
            error: false,
            message: "updated",
            type: res.body
          });
      }
    });
};
