import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card, CardContent } from "@material-ui/core";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
  floatButton: {},
});

class MyTodosCalendar extends Component {
  state = {};

  prepareData = () => {
    const todos = this.props.app.todos;
    const sourceState = this.props.source.sourceState;
    let data = [];
    if (!todos) return;
    todos.forEach((todo) => {
      if (
        (sourceState.showType === "All" ||
          todo.status === sourceState.showType) &&
        (sourceState.severity === "All" ||
          todo.priority === sourceState.severity)
      )
        data.push({
          title: todo.title,
          start: todo.due,
          end: todo.due,
        });
    });
    console.log(data);
    return data;
  };
  render() {
    const { classes } = this.props;
    let data = this.prepareData();
    return (
      <Card className={classes.card}>
        {this.props.source.renderTodoDetailedHeader("calendar")}
        <CardContent
          className={classes.cardContent}
          style={
            this.props.fullScreen ? { height: "77vh" } : { height: "65vh" }
          }
        >
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView={"dayGridMonth"} //dayGridWeek  dayGridMonth
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridWeek,dayGridMonth",
            }}
            height={"72vh"}
            events={data}
          />
        </CardContent>
      </Card>
    );
  }
}

MyTodosCalendar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyTodosCalendar);
