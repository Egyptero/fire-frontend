import request from "superagent";
import url from "../../../app/url";

export default (customerId, ref, callback) => {
  console.log("Delete customer");
  const { app } = ref.props;
  const { tenant, customers } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(
      url() + "/api/v1.0/tenants/" + tenant._id + "/customers/" + customerId
    )
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleting customer , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error deleting customer item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        customers.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleCustomersListLoad(payload);
        console.log("Customer deleted and customers are=>" + payload);
        enqueueSnackbar("Customer deleted");
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            customer: res.body
          });
      }
    });
};
