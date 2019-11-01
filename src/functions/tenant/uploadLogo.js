import request from "superagent";
import url from "../../app/url";
//Ref is equal to this of the caller.
export default (logofile, ref, callback) => {
  const { app } = ref.props;
  const { tenant, tenants } = app;
  const { enqueueSnackbar } = ref.props;
  const formData = new FormData();
  if (!logofile) {
    if (callback)
      return callback({
        error: true,
        message: "error uploading logo",
        sysmessage: "Missing logo file"
      });
    else return;
  }
  formData.append("logo", logofile);
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/upload/logo")
    .set("x-auth-token", ref.props.app.token)
    .send(formData)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error uploading logo");
        if (callback)
          return callback({
            error: true,
            message: "error uploading logo",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (tenants !== null) {
          tenants.forEach(t => {
            if (t._id !== res.body._id) payload.push(t);
          });
        }
        payload.push(res.body);
        app.handleTenantsListLoad(payload);
        app.handleTenantChange(res.body);
        enqueueSnackbar(
          "Organization " + res.body.name + " logo uploaded completely"
        );
        if (callback)
          return callback({
            error: false,
            message: "logo loaded",
            tenant: res.body
          });
      }
    });
};
