import request from "superagent";
import url from "../../../app/url";

export default (ref, range) => {
  console.log("Load my history graph");
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  return new Promise((resolve, reject) => {
    if (!app.tenant) {
      reject({
        error: true,
        message: "No tenant loaded yet",
        sysmessage: "No tenant found"
      });
      return;
    }
    request
      .get(
        url() +
          "/api/v1.0/users/me/tenants/" +
          app.tenant._id +
          "/history/graph/" +
          range
      )
      .set("x-auth-token", app.token)
      .end((err, res) => {
        if (err) {
          if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
          else
            enqueueSnackbar("Error loading history graph , please try again", {
              variant: "error"
            });
          reject({
            error: true,
            message: "error loading history graph",
            sysmessage: res && res.text ? res.text : "error"
          });
        } else {
          resolve(res.body);
        }
      });
  });
};
