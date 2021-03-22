import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { CardContent, CardHeader, Divider, Card } from "@material-ui/core";
import Chart from "react-apexcharts";

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull:{},
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
    let chartData = this.props.data;
    return (
      <Card className={classes.card}>
        <CardHeader title="Activities" titleTypographyProps={{variant:"body1"}}/>
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={
            this.props.fullScreen ? { height: "75vh" } : { height: "68.5vh" }
          }
        >
          {chartData.data && chartData.data.length ? (
            <Chart
              series={chartData.data}
              options={{
                colors: [
                  theme.palette.info.main,
                  theme.palette.warning.main,
                  theme.palette.success.main,
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
                  show: true,
                },
                chart: {
                  id: "todoChart",
                  toolbar: {
                    show: false,
                  },
                },
              }}
              height="100%"
              type="donut"
            />
          ) : (
            ""
          )}
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
