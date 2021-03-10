import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import addTodo from "../../functions/user/addTodo";
import updateTodo from "../../functions/user/updateTodo";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
  floatButton: {},
});

class NewTodo extends Component {
  state = {
    head: "New action",
    title: "",
    description: "",
    due: Date.now(),
    priority: "Medium",
    status: "New",
  };
  componentDidMount() {
    const { source, app } = this.props;
    const { sourceState } = source;
    if (sourceState.todoId && sourceState.action === "edit") {
      const todo = _.filter(
        app.todos,
        (todo) => todo._id === sourceState.todoId
      );
      if (todo.length > 0) this.setInitialState(todo[0]);
    } else this.setInitialState();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const prevTodoId = prevProps.source.sourceState.todoId;
    const todoId = this.props.source.sourceState.todoId;
    if (todoId && todoId !== prevTodoId) {
      // Reload in case of new todoId
      if (this.props.source.sourceState.action === "edit") {
        const todo = _.filter(app.todos, (todo) => todo._id === todoId);
        if (todo.length > 0) this.setInitialState(todo[0]);
      }
    } else if (todoId === null) {
      if (
        this.props.source.sourceState.openTodo !==
        prevProps.source.sourceState.openTodo
      )
        this.setInitialState();
    }
  }
  setInitialState = (todo) => {
    if (todo)
      this.setState({
        head: "Edit action",
        title: todo.title,
        description: todo.description,
        priority: todo.priority,
        due: todo.due,
        status: todo.status,
      });
    else
      this.setState({
        head: "New action",
        title: "",
        description: "",
        due: Date.now(),
        priority: "Medium",
        status: "New",
      });
  };

  handleDataChange = (event) => {
    if (event.target.name === "title")
      this.setState({ title: event.target.value });
    else if (event.target.name === "description")
      this.setState({ description: event.target.value });
    else if (event.target.name === "due")
      this.setState({ due: event.target.value });
    else if (event.target.name === "priority")
      this.setState({ priority: event.target.value });
    else if (event.target.name === "status")
      this.setState({ status: event.target.value });
  };

  handleAddTodo = () => {
    const { handleTodoClose } = this.props.source;
    const { source } = this.props;
    const { sourceState } = source;
    if (sourceState.action === "new")
      addTodo(
        {
          title: this.state.title,
          description: this.state.description,
          due: this.state.due,
          priority: this.state.priority,
          status: this.state.status,
        },
        this,
        (result) => {
          if (!result.error) handleTodoClose();
        }
      );
    else
      updateTodo(
        sourceState.todoId,
        {
          title: this.state.title,
          description: this.state.description,
          due: this.state.due,
          priority: this.state.priority,
          status: this.state.status,
        },
        this,
        (result) => {
          if (!result.error) handleTodoClose();
        }
      );
  };

  formattedDate = (d) => {
    const date = new Date(d);
    return date.toISOString().split("T")[0];
  };
  render() {
    const { source, theme } = this.props;
    const { sourceState, handleTodoClose } = source;
    return (
      <Dialog
        open={sourceState.openTodo}
        onClose={handleTodoClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          style={{
            backgroundColor: theme.palette.secondary.dark,
          }}
        >
          <Typography
            variant="h6"
            style={{
              color: theme.palette.secondary.contrastText,
            }}
          >
            {this.state.head}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1} style={{ padding: theme.spacing(2) }}>
            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink htmlFor="status-label">
                  Status
                </InputLabel>
                <Select
                  value={this.state.status}
                  onChange={this.handleDataChange}
                  name="status"
                  input={<OutlinedInput labelWidth={60} id="status-label" />}
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Progress">Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel shrink htmlFor="priority-label">
                  Priority
                </InputLabel>
                <Select
                  value={this.state.priority}
                  onChange={this.handleDataChange}
                  name="priority"
                  fullWidth
                  input={<OutlinedInput labelWidth={60} id="priority-label" />}
                >
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                name="title"
                label="Title"
                value={this.state.title}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                rows="4"
                multiline
                onChange={this.handleDataChange}
                name="description"
                label="Description"
                value={this.state.description}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                name="due"
                label="Due date"
                value={this.formattedDate(this.state.due)}
                type="Date"
                required
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleTodoClose}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleAddTodo}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
NewTodo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(NewTodo);
