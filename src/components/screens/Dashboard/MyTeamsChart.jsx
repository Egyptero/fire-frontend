import { Card, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Chart from "react-google-charts";
// const CustomTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.common.white,
//     fontSize: 16,
//     fontWeight: "Bold",
//   },
//   body: {
//     //fontSize: 14,
//   },
// }))(TableCell);

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
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  floatButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    width: theme.spacing(4),
    height: theme.spacing(4),
    zIndex: 1,
  },
  floatButtonLeft: {},
});

class MyTeams extends Component {
  state = {};
  prepareDate = () => {
    const { app } = this.props;
    const teams = app.myTeams ? app.myTeams : [];
    let data = [["Status", "Count"]];
    let statusCount = {
      ready: 0,
      notready: 0,
      handling: 0,
      unknown: 0,
      loggedin: 0,
      loggedout: 0,
      wrapup: 0,
      error: 0,
      reserved: 0,
    };
    if (teams)
      teams.forEach((user) => {
        switch (user.status) {
          case "Ready":
            statusCount.ready += 1;
            break;
          case "Not ready":
            statusCount.notready += 1;
            break;
          case "Handling":
            statusCount.handling += 1;
            break;
          case "Unknown":
            statusCount.unknown += 1;
            break;
          case "Wrap up":
            statusCount.wrapup += 1;
            break;
          case "Reserved":
            statusCount.reserved += 1;
            break;
          case "Error":
            statusCount.error += 1;
            break;
          case "Logged In":
            statusCount.loggedin += 1;
            break;
          case "Logged Out":
            statusCount.loggedout += 1;
            break;
          default:
            break;
        }
      });
    data.push(["Ready", statusCount.ready]);
    data.push(["Not ready", statusCount.notready]);
    data.push(["Handling", statusCount.handling]);
    data.push(["Reserved", statusCount.reserved]);
    data.push(["Wrap up", statusCount.wrapup]);
    data.push(["Error", statusCount.error]);
    data.push(["Logged in", statusCount.loggedin]);
    data.push(["Logged out", statusCount.loggedout]);
    data.push(["Unknown", statusCount.unknown]);
    return data;
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent
          className={classes.cardContent}
          style={this.props.fullScreen ? { height: "75vh" } : {}}
        >
          <Chart
            chartType="PieChart"
            data={this.prepareDate()}
            options={
              // Chart options
              {
                width: "100%",
                height: "28vh",
                //is3D:true,
                title: "Team status",
                titleTextStyle: {
                  fontSize: 24,
                  
                },
                hAxis: {
                  title: "Status",
                },
                vAxis: { title: "Count" },
                // legend: "none",
                position: "relative",
                //colors: ["green", "orange", "red"],
                legend: { position: "bottom" },
              }
            }
            legendToggle
          />
        </CardContent>
      </Card>
    );
  }
}

MyTeams.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyTeams);
