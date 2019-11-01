import request from "superagent";
import url from "../../app/url";

export default (todoId, data, ref, callback) => {
  const { app } = ref.props;
  const { todos } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .put(url() + "/api/v1.0/users/me/todos/" + todoId)
    .set("x-auth-token", ref.props.app.token)
    .send(data)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error updating to do , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error updating to do item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        todos.forEach(u => {
          if (u._id === res.body._id)
            //Same one should be updated now
            payload.push(res.body);
          else payload.push(u);
        });
        app.handleTodoListLoad(payload);
        enqueueSnackbar("To do updated", { variant: "info" });
        if (callback)
          return callback({
            error: false,
            message: "updated",
            todo: res.body
          });
      }
    });
};
