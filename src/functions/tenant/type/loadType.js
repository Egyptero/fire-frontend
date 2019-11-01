import request from "superagent";
import url from "../../../app/url";

export default (typeId, ref, callback) => {
  const { app } = ref.props;
  const { tenant, types } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading type id:" + typeId);
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
    .get(url() + "/api/v1.0/tenants/" + tenant._id + "/types/" + typeId)
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading type , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading type",
            sysmessage: res.body
          });
      } else {
        let payload = [];
        if (types) {
          types.forEach(type => {
            if (res.body._id === type._id) payload.push(res.body);
            else payload.push(type);
          });
        } else payload.push(res.body);
        app.handleTypesListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            types: res.body
          });
      }
    });
};
