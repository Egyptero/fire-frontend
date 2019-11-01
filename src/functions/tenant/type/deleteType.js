import request from "superagent";
import url from "../../../app/url";

export default (typeId, ref, callback) => {
  console.log("Delete type");
  const { app } = ref.props;
  const { tenant, types } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(url() + "/api/v1.0/tenants/" + tenant._id + "/types/" + typeId)
    .set("x-auth-token", app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text);
        else enqueueSnackbar("Error deleting type , please try again");
        if (callback)
          return callback({
            error: true,
            message: "error deleting type item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        types.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleTypesListLoad(payload);
        console.log("Type deleted and types are=>" + payload);
        enqueueSnackbar("Type deleted");
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            type: res.body
          });
      }
    });
};
