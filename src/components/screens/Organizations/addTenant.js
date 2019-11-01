import request from "superagent";
import url from "../../../app/url";
//Ref is equal to this of the caller.
export default (tenant, ref) => {
  let { tenants } = ref.state;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants")
    .set("x-auth-token", ref.props.app.token)
    .send({
      name: tenant.name,
      email: tenant.email
    })
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding organization , please try again");
        return;
      } else {
        ref.handleNewTenantClose();
        let payload = [];
        tenants.forEach(t => {
          payload.push(t);
        });
        payload.push(res.body);
        ref.setState({ tenants: payload });
        enqueueSnackbar(
          "Organization " +
            res.body.name +
            " added, please logout and login again to use it"
        );
      }
    });
};
