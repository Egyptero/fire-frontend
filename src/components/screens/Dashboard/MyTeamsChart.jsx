import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Grow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Chart from "react-apexcharts";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull:{},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    //height: "30vh",
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
    let chartData = this.props.data;
    return (
      <Card className={classes.card}>
        <CardHeader title="Team" titleTypographyProps={{variant:"body1"}}/>
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={this.props.fullScreen ? { height: "75vh" } : {}}
        >
          <Grid
            container
            alignItems="center"
            justify="center"
            //style={{ height: "100%" }}
          >
            {chartData.data && chartData.data.length ? (
              <Chart
                series={chartData.data}
                options={{
                  colors: [
                    theme.palette.success.main,
                    theme.palette.error.main,
                    theme.palette.info.main,
                    theme.palette.info.main,
                    theme.palette.info.main,
                    theme.palette.secondary.main,
                    theme.palette.error.main,
                    theme.palette.secondary.main,
                    theme.palette.secondary.main,
                  ],
                  labels: chartData.categories,
                  dataLabels: {
                    enabled: true,
                    textAnchor: "middle",
                    style: {
                      fontSize: "16px",
                    },
                  },
                  legend: {
                    show: false,
                  },
                  chart: {
                    id: "teamChart",
                    toolbar: {
                      show: false,
                    },
                  },
                }}
                width="80%"
                type="donut"
              />
            ) : (
              ""
            )}
          </Grid>
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
  data: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyTeams);
