import request from "superagent";
import url from "../../app/url";
//Ref is equal to this of the caller.
export default (tenant, ref, callback) => {
  const { app } = ref.props;
  const { tenants } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants")
    .set("x-auth-token", ref.props.app.token)
    .send(tenant)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding organization , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding organization",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        console.log("Current tenants as is:");
        console.log(tenants);
        if (tenants !== null) {
          tenants.forEach(t => {
            payload.push(t);
          });
        }
        payload.push(res.body);
        app.handleTenantsListLoad(payload);
        app.handleTenantChange(res.body);
        enqueueSnackbar("Organization " + res.body.name + " added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            tenant: res.body
          });
      }
    });
};
