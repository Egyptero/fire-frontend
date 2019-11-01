import request from "superagent";
import url from "../../app/url";
//Ref is equal to this of the caller.
export default (docfiles, ref, callback) => {
  const { app } = ref.props;
  const { tenant, tenants } = app;
  const { enqueueSnackbar } = ref.props;
  const formData = new FormData();
  if (!docfiles) {
    if (callback)
      return callback({
        error: true,
        message: "error uploading docs",
        sysmessage: "Missing docs files"
      });
    else return;
  }
  docfiles.forEach((docfile, index) => {
    formData.append("doc" + index, docfile);
  });
  console.log("Upload tenant documents ====>");
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/upload/docs")
    .set("x-auth-token", ref.props.app.token)
    .send(formData)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error uploading documents");
        if (callback)
          return callback({
            error: true,
            message: "error uploading documents",
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
          "Organization " + res.body.name + " documents uploaded completely"
        );
        if (callback)
          return callback({
            error: false,
            message: "documents loaded",
            tenant: res.body
          });
      }
    });
};
