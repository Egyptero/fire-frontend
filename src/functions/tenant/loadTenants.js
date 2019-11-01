import request from "superagent";
import url from "../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  request
    .get(url() + "/api/v1.0/tenants")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading tenants list , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading tenants list",
            sysmessage: res && res.text ? res.text : "Error Loading Tenants"
          });
      } else {
        app.handleTenantsListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            tenants: res.body
          });
      }
    });
};
