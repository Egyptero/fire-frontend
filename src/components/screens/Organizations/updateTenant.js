import request from "superagent";
import url from "../../../app/url";
//Ref is equal to this of the caller.
export default (id,tenant, ref) => {
  const { enqueueSnackbar } = ref.props;
  request
    .put(url() + "/api/v1.0/tenants/" + id)
    .set("x-auth-token", ref.props.app.token)
    .send(tenant)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating organization , please try again");
      } else {
        enqueueSnackbar("Organization " + res.body.name + " updated");
      }
    });
};
