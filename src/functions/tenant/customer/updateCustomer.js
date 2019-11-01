import request from "superagent";
import url from "../../../app/url";

export default (customerId, data, ref, callback) => {
  console.log("Update customer");
  console.log("Update customer data is:" + data);
  const { app } = ref.props;
  const { tenant, customers } = app;
  const { enqueueSnackbar } = ref.props;

  request
    .put(url() + "/api/v1.0/tenants/" + tenant._id + "/customers/" + customerId)
    .set("x-auth-token", app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error updating customer , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error updating customer item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        customers.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleCustomersListLoad(payload);
        console.log("Customer updated and customers are=>" + payload);
        enqueueSnackbar("Customer updated");
        if (callback)
          return callback({
            error: false,
            message: "updated",
            customer: res.body
          });
      }
    });
};
