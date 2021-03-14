import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Add, Refresh, TableChart, BarChart } from "@material-ui/icons";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import loadTodos from "../../../functions/user/loadTodos";
import TodoDialog from "../../dialogs/TodoDialog";
import updateTodo from "../../../functions/user/updateTodo";
import TodoItem from "./Todo/TodoItem";
import deleteTodo from "../../../functions/user/deleteTodo";
import MyTodosChart from "./MyTodosChart";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "32vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    marginLeft: theme.spacing(),
  },
  floatButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  },
});

class MyTodos extends Component {
  state = {
    openTodo: false,
    action: "new",
    todoId: null,
    showType: "New",
    view: "Detailed",
    severity: "All",
    screenView: "Table", //Table
  };
  componentDidMount() {
    if (!this.props.fullScreen) this.setState({ screenView: "Graph" });
  }

  handleNewTodoOpen = () => {
    this.setState({ openTodo: true, action: "new", todoId: null });
  };
  handleEditTodoOpen = (todoId) => {
    this.setState({ openTodo: true, action: "edit", todoId });
  };
  handleMarkCompleted = (todoId) => {
    this.setState({ todoId });
    updateTodo(todoId, { status: "Completed" }, this);
  };
  handleMarkProgress = (todoId) => {
    this.setState({ todoId });
    updateTodo(todoId, { status: "Progress" }, this);
  };
  handleDeleteTodo = (todoId) => {
    this.setState({ todoId });
    deleteTodo(todoId, this);
  };
  handleTodoClose = () => {
    this.setState({ openTodo: false });
  };
  changeShowType = (event) => {
    this.setState({ showType: event.target.value });
  };
  changeView = (event) => {
    this.setState({ view: event.target.value });
  };
  changeSeverity = (event) => {
    this.setState({ severity: event.target.value });
  };
  reloadTodos = () => {
    loadTodos(this);
  };
  getSharedObject = () => {
    return {
      handleTodoClose: this.handleTodoClose,
      handleEditTodoOpen: this.handleEditTodoOpen,
      handleMarkCompleted: this.handleMarkCompleted,
      handleMarkProgress: this.handleMarkProgress,
      handleDeleteTodo: this.handleDeleteTodo,
      sourceState: this.state,
    };
  };
  toggelView = () => {
    const { screenView } = this.state;
    if (screenView === "Table") this.setState({ screenView: "Graph" });
    else if (screenView === "Graph") this.setState({ screenView: "Table" });
  };
  renderTodoList = (todo) => {
    if (
      (this.state.showType === "All" || todo.status === this.state.showType) &&
      (this.state.severity === "All" || todo.priority === this.state.severity)
    )
      return (
        <TodoItem
          key={todo._id}
          {...this.props}
          todo={todo}
          source={this.getSharedObject()}
          view={this.state.view}
        />
      );
  };
  renderTodoDetailedView = () => {
    const { classes } = this.props;
    const { app } = this.props;
    const todos = app.todos ? app.todos : [];
    return (
      <React.Fragment>
        <CardHeader
          action={
            <div>
              {this.props.fullScreen ? (
                <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="bot-label-placeholder">
                    Severity
                  </InputLabel>
                  <Select
                    value={this.state.severity}
                    onChange={this.changeSeverity}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Critical"}>Critical</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                ""
              )}
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="bot-label-placeholder">
                  View
                </InputLabel>
                <Select value={this.state.view} onChange={this.changeView}>
                  <MenuItem value={"Summary"}>Summary</MenuItem>
                  <MenuItem value={"Detailed"}>Detailed</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="bot-label-placeholder">
                  Status
                </InputLabel>
                <Select
                  value={this.state.showType}
                  onChange={this.changeShowType}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"New"}>New</MenuItem>
                  <MenuItem value={"Progress"}>Progress</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={this.reloadTodos}>
                <Refresh />
              </IconButton>
              <IconButton onClick={this.handleNewTodoOpen}>
                <Add />
              </IconButton>
            </div>
          }
          title="Tasks"
        />
        {/* <Divider /> */}

        <CardContent
          className={classes.cardContent}
          style={
            this.props.fullScreen ? { height: "75vh" } : { height: "58vh" }
          }
        >
          {/**className={classes.cardContent} */}
          {/* <Grid container className={classes.grid}> */}
          <List>
            {todos.map((todo) => {
              return this.renderTodoList(todo);
            })}
          </List>
          {/* </Grid> */}
        </CardContent>
      </React.Fragment>
    );
  };
  renderChart = () => {
    return <MyTodosChart {...this.props} />;
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Card className={classes.card}>
          {this.state.screenView === "Graph"
            ? this.renderChart()
            : this.renderTodoDetailedView()}
        </Card>
        <TodoDialog {...this.props} source={this.getSharedObject()} />
        <IconButton className={classes.floatButton} onClick={this.toggelView}>
          {this.state.screenView === "Graph" ? <TableChart /> : <BarChart />}
        </IconButton>
      </React.Fragment>
    );
  }
}

MyTodos.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  // fullScreen: PropTypes.bool.optional it give exception in runtime
};
export default withStyles(styles, { withTheme: true })(MyTodos);
