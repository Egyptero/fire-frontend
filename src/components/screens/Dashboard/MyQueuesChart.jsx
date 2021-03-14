import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Divider, Grid, Typography } from "@material-ui/core";
import _ from "lodash";
import Chart from "react-google-charts";

const styles = theme => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "18vh",
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
  },
  floatButtonLeft: {}
});

class MyQueues extends Component {
  state = {};
  render() {
    const { classes, theme } = this.props;
    const chartData = this.props.data;
    return (
      <Card className={classes.card}>
        <CardHeader title="Queues"/>
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={this.props.fullScreen ? { height: "75vh" } : {}}
        >
          <Grid container alignItems="center" justify="center">
            {chartData ? (
              <Chart
                chartType="ColumnChart"
                data={chartData}
                options={
                  // Chart options
                  {
                    //height:"16vh",
                    width:"100%",
                    // title: "Queues",
                    // titleTextStyle: {
                    //   fontSize: 24,
                      
                    // },    
                    hAxis: {
                      title: "Queues"
                    },
                    // vAxis: { title: "Customers" },
                    legend: "none",
                    position: "relative",//relative
                    colors: [
                      theme.palette.error.light,
                      theme.palette.info.light
                    ]
                  }
                }
                legendToggle
              />
            ) : (
              <Typography variant="h6">No skillgroups defined</Typography>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

MyQueues.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  data:PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyQueues);
