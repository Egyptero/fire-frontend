import request from "superagent";
import url from "../../../app/url";

export default (customerId, ref, callback) => {
  const { app } = ref.props;
  const { tenant, customers } = app;
  const { enqueueSnackbar } = ref.props;
  console.log("Loading customer id:" + customerId);
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
    .get(url() + "/api/v1.0/tenants/" + tenant._id + "/customers/" + customerId)
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error loading customer , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error loading customer",
            sysmessage: res.body
          });
      } else {
        let payload = [];
        if (customers) {
          customers.forEach(customer => {
            if (res.body._id === customer._id) payload.push(res.body);
            else payload.push(customer);
          });
        } else payload.push(res.body);
        app.handleCustomersListLoad(payload);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            customers: res.body
          });
      }
    });
};
