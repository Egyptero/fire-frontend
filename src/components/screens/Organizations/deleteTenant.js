import request from "superagent";
import url from "../../../app/url";
//Ref is equal to this of the caller.
export default (tenant, ref) => {
  const { enqueueSnackbar } = ref.props;
  //request user delete
  //TODO We need to change the delete behavior to remove only tenantId from the user
  request
    .delete(url() + "/api/v1.0/tenants/" + tenant._id)
    .set("x-auth-token", ref.props.app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleteing user , please try again");
      } else {
        enqueueSnackbar("Organization with name " + res.body.name + " deleted");
      }
    });
};
