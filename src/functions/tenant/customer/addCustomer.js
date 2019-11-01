import request from "superagent";
import url from "../../../app/url";

export default (customer, ref, callback) => {
  console.log("Adding new customer");
  console.log(customer);
  const { app } = ref.props;
  const { tenant, customers } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/tenants/" + tenant._id + "/customers")
    .set("x-auth-token", app.token)
    .send(customer)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error adding customer , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error adding customer item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (customers !== null) {
          customers.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleCustomersListLoad(payload);
        console.log("Customer added and customers are=>" + payload);
        enqueueSnackbar("Customer added");
        if (callback)
          return callback({
            error: false,
            message: "added",
            customer: res.body
          });
      }
    });
};
