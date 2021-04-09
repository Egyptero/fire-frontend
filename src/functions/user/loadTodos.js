import request from "superagent";
import url from "../../app/url";

export default (ref, callback) => {
  const { app } = ref.props;
  const { enqueueSnackbar } = ref.props;
  request
    .get(url() + "/api/v1.0/users/me/todos")
    .set("x-auth-token", app.token)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error loading to do list , please try again", {
            variant: "error",
          });
        if (callback)
          return callback({
            error: true,
            message: "error loading to do list",
            sysmessage: res ? res.body : "",
          });
      } else {
        app.handleTodoListLoad(res.body);
        if (callback)
          return callback({
            error: false,
            message: "loaded",
            todos: res.body,
          });
      }
    });
};
