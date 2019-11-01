import request from "superagent";
import url from "../../../app/url";

export default (ref, callback) => {
  console.log("Load my tenants");
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  request
    .get(url() + "/api/v1.0/users/me/tenants")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading user tenants , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading user tenants",
            sysmessage: res && res.text ? res.text : "error"
          });
      } else {
        app.handleMyTenantsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            tenants: res.body
          });
      }
    });
};
