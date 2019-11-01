import request from "superagent";
import url from "../../../app/url";

export default (type, ref, callback) => {
  console.log("Adding new type");
  console.log(type);
  const { app } = ref.props;
  const { tenant, types } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/types")
    .set("x-auth-token", app.token)
    .send(type)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding type , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding type item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (types !== null) {
          types.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleTypesListLoad(payload);
        console.log("Type added and types are=>" + payload);
        enqueueSnackbar("Type added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            type: res.body
          });
      }
    });
};
