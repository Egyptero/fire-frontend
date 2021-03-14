import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import Chart from "react-google-charts";

const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "32vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  formControl: {
    marginLeft: theme.spacing()
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  floatButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: theme.spacing(4),
    height: theme.spacing(4),
    zIndex: 1
  }
});

class MyTeams extends Component {
  state = {};
  prepareDate = () => {
    const { app } = this.props;
    const todos = app.todos ? app.todos : [];
    let data = [["Status", "Activities"]];
    let statusCount = {
      new: 0,
      progress: 0,
      completed: 0
    };
    if (todos)
      todos.forEach(todo => {
        switch (todo.status) {
          case "New":
            statusCount.new += 1;
            break;
          case "Progress":
            statusCount.progress += 1;
            break;
          case "Completed":
            statusCount.completed += 1;
            break;
          default:
            break;
        }
      });
    data.push(["New", statusCount.new]);
    data.push(["Progress", statusCount.progress]);
    data.push(["Completed", statusCount.completed]);
    return data;
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <CardContent
        className={classes.cardContent}
        style={this.props.fullScreen ? { height: "75vh" } : {height: "59vh"}}
      >
        <Chart
          chartType="ColumnChart"
          data={this.prepareDate()}
          options={
            // Chart options
            {
              title: "To do progress",
              hAxis: {
                title: "Status"
              },
              vAxis: { title: "Activities" },
              legend: "none",
              position: "relative",
              colors: [theme.palette.primary.main]
            }
          }
          legendToggle
        />
      </CardContent>
    );
  }
}

MyTeams.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(MyTeams);
