import request from "superagent";
import url from "../../app/url";

export default (todo, ref, callback) => {
  const { app } = ref.props;
  const { todos } = app;
  const { enqueueSnackbar } = ref.props;
  request
    .post(url() + "/api/v1.0/users/me/todos")
    .set("x-auth-token", ref.props.app.token)
    .send(todo)
    .end((err, res) => {
      if (err) {
        if (res && res.text) enqueueSnackbar(res.text, { variant: "error" });
        else
          enqueueSnackbar("Error adding to do , please try again", {
            variant: "error"
          });
        if (callback)
          return callback({
            error: true,
            message: "error adding to do item",
            sysmessage: res.text
          });
      } else {
        let payload = [];
        if (todos !== null) {
          todos.forEach(u => {
            payload.push(u);
          });
        }
        payload.push(res.body);

        app.handleTodoListLoad(payload);
        enqueueSnackbar("To do added", { variant: "info" });
        if (callback)
          return callback({
            error: false,
            message: "added",
            todo: res.body
          });
      }
    });
};
