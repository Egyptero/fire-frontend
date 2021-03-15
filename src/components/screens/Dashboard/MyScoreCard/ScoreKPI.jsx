import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GaugeChart from "react-gauge-chart";
import { Divider, Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  formControl: {},
  row: {},
  floatButton: {},
  floatButtonLeft: {},
});

class ScoreKPI extends Component {
  state = {};
  render() {
    const { classes, params, theme } = this.props;
    return (
      <Grid container direction="column" alignItems="center">
        <GaugeChart
          nrOfLevels={8}
          colors={[
            theme.palette.error.dark,
            theme.palette.error.main,
            theme.palette.warning.main,
            theme.palette.warning.light,
            theme.palette.success.light,
            theme.palette.success.light,
            theme.palette.success.main,
            theme.palette.success.dark,
          ]}
          arcWidth={0.3}
          percent={params.value}
          textColor={theme.palette.secondary.dark}
          needleColor={theme.palette.secondary.light}
          needleBaseColor={theme.palette.secondary.main}
        />
        <Typography variant="h6">{params.kpi}</Typography>
        <Divider />
        <Typography variant="caption">{params.caption}</Typography>
        <Typography variant="subtitle1">Target</Typography>
        <Typography variant="caption">{params.target}</Typography>
      </Grid>
    );
  }
}

ScoreKPI.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};
export default withStyles(styles, { withTheme: true })(ScoreKPI);
