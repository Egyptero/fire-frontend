import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CardContent, CardHeader, Divider } from "@material-ui/core";
import Chart from "react-google-charts";

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
});

class MyTeams extends Component {
  state = {};

  render() {
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <CardHeader title="Tasks" />
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={
            this.props.fullScreen ? { height: "75vh" } : { height: "59vh" }
          }
        >
          <Chart
            chartType="PieChart"
            data={this.props.data}
            height="54vh"
            options={
              // Chart options
              {
                //title: "To do progress",
                hAxis: {
                  title: "Status",
                },
                vAxis: { title: "Activities" },
                legend: { position: "bottom" },
                position: "relative",
                colors: [
                  theme.palette.info.light,
                  theme.palette.warning.light,
                  theme.palette.success.light,
                ]
              }
            }
            legendToggle
          />
        </CardContent>
      </React.Fragment>
    );
  }
}

MyTeams.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyTeams);
