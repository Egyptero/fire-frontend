import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import Chart from "react-google-charts";
import GaugeChart from "react-gauge-chart";
import ScoreKPI from "./MyScoreCard/ScoreKPI";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    //height: "32vh", //32 vh
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
  formControl: {},
  row: {},
  floatButton: {},
  floatButtonLeft: {},
});

class MyScroreCard extends Component {
  state = {};
  render() {
    const { classes, params, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Score card"></CardHeader>
        <Divider />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <ScoreKPI
                {...this.props}
                params={{
                  value: 0.37,
                  kpi:"Utlization",
                  caption: "Time utilization %",
                  target: "85%",
                  actual: "37%"
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <ScoreKPI
                {...this.props}
                params={{
                  value: 0.86,
                  kpi:"SLA",
                  caption: "Service level agreement",
                  target: "75%",
                  actual: "86%"
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <ScoreKPI
                {...this.props}
                params={{
                  value: 0.17,
                  kpi: "ASA",
                  caption: "Average speed of answer",
                  target: "95%",
                  actual: "17%"
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <ScoreKPI
                {...this.props}
                params={{
                  value: 1,
                  kpi: "Coversations",
                  caption: "Coversations handled",
                  target: "96%",
                  actual: "100%"
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

MyScroreCard.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyScroreCard);
