import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading types");
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
    .get(url() + "/api/v1.0/tenants/" + app.tenant._id + "/types")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading types list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading types list",
            sysmessage: res.body
          });
      } else {
        console.log("types received",res.body);
        app.handleTypesListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            types: res.body
          });
      }
    });
};
