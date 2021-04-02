import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Card, CardContent, Divider } from "@material-ui/core";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
  cardContent: {},
  formControl: {},
  floatButton: {},
});

class MyTodosCalendar extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    //this.prepareData();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Data will update in calendar");
    // if (
    //   JSON.stringify(this.props.app.todos) ==
    //     JSON.stringify(prevProps.app.todos) &&
    //   this.props.source.sourceState.showType ===
    //     prevProps.source.sourceState.showType &&
    //   this.props.source.sourceState.severity ===
    //     prevProps.source.sourceState.severity
    // )
    //   return;

    console.log("Data will calc data in calendar");
    //this.prepareData();
  }
  prepareData = () => {
    const { theme } = this.props;
    const todos = this.props.app.todos;
    const sourceState = this.props.source.sourceState;
    let data = [];
    let color = theme.palette.info.main;
    if (!todos) return;
    todos.forEach((todo) => {
      if (
        (sourceState.showType === "All" ||
          todo.status === sourceState.showType) &&
        (sourceState.severity === "All" ||
          todo.priority === sourceState.severity)
      ) {
        color =
          todo.status === "New"
            ? theme.palette.info.main
            : todo.status === "Completed"
            ? theme.palette.success.main
            : theme.palette.warning.main;
        data.push({
          id: todo._id,
          title: todo.title,
          start: todo.due,
          end: todo.due,
          allDay: true,
          color,
        });
      }
    });
    //this.setState({ data });
    return data;
  };
  render() {
    const { classes } = this.props;
    // const { data } = this.state;
    // if (!data || data.length < 1) return <React.Fragment />;
    return (
      <Card className={classes.card}>
        {this.props.source.renderTodoDetailedHeader("calendar")}
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={
            this.props.fullScreen ? { height: "83vh" } : { height: "65vh" }
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
            //stickyHeaderDates={true}
            //showNonCurrentDates={false}
            //fixedWeekCount={true}
            // contentHeight={"100%"}
            titleFormat={{ year: "numeric", month: "long" }}
            height={"100%"}
            dayMaxEventRows={true}
            // editable={true}
            // eventStartEditable={true}
            // eventResourceEditable={true}
            // droppable={true}
            // eventOverlap={true}
            //aspectRatio={1.5}
            //_resize={true}
            //_resize="false"
            //            contentHeight={"76vh"}
            events={this.prepareData()}
            eventClick={(info) => {
              this.props.source.handleEditTodoOpen(info.event.id);
            }}
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
