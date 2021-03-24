import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Add,
  Refresh,
  TableChart,
  BarChart,
  PieChart,
} from "@material-ui/icons";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grow,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
import loadTodos from "../../../functions/user/loadTodos";
import TodoDialog from "../../dialogs/TodoDialog";
import updateTodo from "../../../functions/user/updateTodo";
import TodoItem from "./Todo/TodoItem";
import deleteTodo from "../../../functions/user/deleteTodo";
import MyTodosChart from "./MyTodosChart";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import MyTodosCalendar from "./MyTodosCalendar";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    //height: "32vh",
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
    showType: "All",
    view: "Detailed",
    severity: "All",
    screenView: "Graph", //Table
  };
  componentDidMount() {
    if (this.props.fullScreen) this.setState({ screenView: "Graph" });
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
      renderTodoDetailedHeader: this.renderTodoDetailedHeader,
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
  renderTodoDetailedHeader = (type) => {
    const { classes } = this.props;
    return (
      <CardHeader
        style={{
          padding: this.props.theme.spacing(1),
        }}
        action={
          <React.Fragment>
            {/* {this.props.fullScreen ? ( */}
            <FormControl className={classes.formControl} size="small">
              <InputLabel
                shrink
                htmlFor="bot-label-placeholder"
                //style={{ paddingBottom: 0, marginBottom: 0 }}
              >
                <Typography variant="caption">Severity</Typography>
              </InputLabel>
              <Select
                value={this.state.severity}
                onChange={this.changeSeverity}
                style={{ margin: 5 }}
              >
                <MenuItem value={"All"}>
                  <Typography variant="caption">All</Typography>
                </MenuItem>
                <MenuItem value={"Critical"}>
                  <Typography variant="caption">Critical</Typography>
                </MenuItem>
                <MenuItem value={"High"}>
                  <Typography variant="caption">High</Typography>
                </MenuItem>
                <MenuItem value={"Medium"}>
                  <Typography variant="caption">Medium</Typography>
                </MenuItem>
                <MenuItem value={"Low"}>
                  <Typography variant="caption">Low</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            {/* // ) : ( // "" // )} */}
            {type === "calendar" || type === "chart" ? (
              ""
            ) : (
              <FormControl className={classes.formControl} size="small">
                <InputLabel
                  shrink
                  htmlFor="bot-label-placeholder"
                  //style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Typography variant="caption">View</Typography>
                </InputLabel>

                <Select
                  value={this.state.view}
                  onChange={this.changeView}
                  style={{ margin: 5 }}
                >
                  <MenuItem value={"Summary"}>
                    <Typography variant="caption">Summary</Typography>
                  </MenuItem>
                  <MenuItem value={"Detailed"}>
                    <Typography variant="caption">Detailed</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            {type === "chart" ? (
              ""
            ) : (
              <FormControl className={classes.formControl} size="small">
                <InputLabel
                  shrink
                  htmlFor="bot-label-placeholder"
                  //style={{ paddingBottom: 0, marginBottom: 0 }}
                >
                  <Typography variant="caption">Status</Typography>
                </InputLabel>
                <Select
                  value={this.state.showType}
                  onChange={this.changeShowType}
                  style={{ margin: 5 }}
                >
                  <MenuItem value={"All"}>
                    <Typography variant="caption">All</Typography>
                  </MenuItem>
                  <MenuItem value={"New"}>
                    <Typography variant="caption">New</Typography>
                  </MenuItem>
                  <MenuItem value={"Progress"}>
                    <Typography variant="caption">Progress</Typography>
                  </MenuItem>
                  <MenuItem value={"Completed"}>
                    <Typography variant="caption">Completed</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            )}
            <IconButton onClick={this.reloadTodos} size="small">
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton onClick={this.toggelView} size="small">
              {this.state.screenView === "Graph" ? (
                <TableChart fontSize="small" />
              ) : (
                <PieChart fontSize="small" />
              )}
            </IconButton>
            <IconButton onClick={this.handleNewTodoOpen} size="small">
              <Add fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
        title="Activities"
        titleTypographyProps={{ variant: "body1" }}
      />
    );
  };
  renderTodoDetailedView = () => {
    const { classes } = this.props;
    const { app } = this.props;
    const todos = app.todos ? app.todos : [];
    return (
      <Grid container alignItems="center" justify="center">
        {this.props.fullScreen ? "" : ""}
        <Card className={classes.card}>
          {this.renderTodoDetailedHeader()}
          {/* <Divider /> */}

          <CardContent
            className={classes.cardContent}
            style={
              this.props.fullScreen ? { height: "80vh" } : { height: "70vh" }
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
        </Card>
      </Grid>
    );
  };
  renderChart = () => {
    return <MyTodosChart {...this.props} source={this.getSharedObject()} />;
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.state.screenView === "Graph" ? (
          !this.props.fullScreen ? (
            this.renderChart()
          ) : (
            <MyTodosCalendar {...this.props} source={this.getSharedObject()} />
          )
        ) : (
          this.renderTodoDetailedView()
        )}

        <TodoDialog {...this.props} source={this.getSharedObject()} />
        {/* Hide graph switch in case of full screen */}
        {/* {!this.props.fullScreen ? ( */}
        {/* <IconButton className={classes.floatButton} onClick={this.toggelView}>
          {this.state.screenView === "Graph" ? <TableChart /> : <PieChart />}
        </IconButton> */}
        {/* ) : (
          ""
        )} */}
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
