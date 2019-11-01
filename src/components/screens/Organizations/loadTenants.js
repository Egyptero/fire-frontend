import request from "superagent";
import url from "../../../app/url";

export default ref => {
  const { enqueueSnackbar } = ref.props;
  request
    .get(`${url()}/api/v1.0/tenants`)
    .set("x-auth-token", ref.props.app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error during tenants loading .. please relogin");
        return;
      } else {
        const tenants = res.body;
        ref.setState({ tenants });
      }
    });
};
