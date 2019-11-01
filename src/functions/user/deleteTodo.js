import request from "superagent";
import url from "../../app/url";

export default (todoId, ref, callback) => {
  const { app } = ref.props;
  const { todos } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .delete(url() + "/api/v1.0/users/me/todos/" + todoId)
    .set("x-auth-token", ref.props.app.token)
    .send()
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error deleting to do , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error deleting to do item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        todos.forEach(u => {
          if (u._id !== res.body._id) payload.push(u);
        });
        app.handleTodoListLoad(payload);
        enqueueSnackbar("To do deleted", { variant: "info" });
        if (callback)
          return callback({
            error: false,
            message: "deleted",
            todo: res.body
          });
      }
    });
};
