import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
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
    height: "18vh",
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
  render() {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Team"/>
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={this.props.fullScreen ? { height: "75vh" } : {}}
        >
          <Chart
            chartType="PieChart"
            data={this.props.data}
            options={
              // Chart options
              {
                width: "100%",
                //height: "18vh",
                //is3D:true,
                // title: "Team status",
                // titleTextStyle: {
                //   fontSize: 24,
                  
                // },
                hAxis: {
                  title: "Status",
                },
                vAxis: { title: "Count" },
                // legend: "none",
                position: "relative",
                //colors: ["green", "orange", "red"],
                legend: { position: "bottom" },
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.secondary.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.primary.light,
                  theme.palette.info.light,
                  theme.palette.secondary.light,
                  theme.palette.error.light,
                  theme.palette.warning.light,
                  theme.palette.primary.dark,
                  theme.palette.info.dark,
                  theme.palette.secondary.dark,
                  theme.palette.error.dark,
                  theme.palette.warning.dark,
                ]
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
  data:PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyTeams);
