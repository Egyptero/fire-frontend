import React, { Component } from "react";
import { Card, Grid, CardHeader, CardContent, Chip } from "@material-ui/core";
//import classNames from 'classnames';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import HistorySummary from "./History/HistorySummary";
import HistoryRange from "./History/HistoryRange";
import HistoryDetails from "./History/HistoryDetails";
import HistoryChart from "./History/HistoryChart";
const styles = theme => ({
  content: {
    flexGrow: 1
    //    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "50%",
    minHeight: "50%",
    maxWidth: "100%"
  },
  fullgrid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    display: "block",
    position: "absolute",

    //    position: "relative",
    overflow: "auto",
    //height: "55vh",
    maxWidth: "92.7vw",
    "&::-webkit-scrollbar": {
      width: "0.4em"
      //height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  cardContent: {},
  gridContent: {
    position: "relative",
    //overflow: "auto",
    //height: "35vh",
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
  }
});

class History extends Component {
  state = {
    range: "today"
  };
  setRange = range => {
    this.setState({ range });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <HistorySummary {...this.props} range={this.state.range} />
          </Grid>
          <Grid item md={8}>
            <HistoryRange
              {...this.props}
              range={this.state.range}
              setRange={this.setRange}
            />
          </Grid>
          <Grid item xs={12}>
            <HistoryChart {...this.props} range={this.state.range} />
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <HistoryDetails {...this.props} range={this.state.range} />
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

History.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(History);
