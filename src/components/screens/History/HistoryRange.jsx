import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
const styles = theme => ({
  content: {},
  grid: {},
  fullgrid: {},
  card: {},
  cardContent: {},
  gridContent: {}
});

class HistoryRange extends Component {
  state = {};
  render() {
    return (
      <Grid container direction="row-reverse">
        <BottomNavigation
          value={this.props.range}
          onChange={(event, newValue) => {
            event.preventDefault();
            event.stopPropagation();
            this.props.setRange(newValue);
          }}
          showLabels
          style={{ backgroundColor: "transparent" }}
        >
          <BottomNavigationAction label="Today" value="today" />
          <BottomNavigationAction label="Yesterday" value="yesterday" />
          <BottomNavigationAction label="Week" value="week" />
          {/* <BottomNavigationAction label="Last week" value="lastweek" /> */}
          <BottomNavigationAction label="Month" value="month" />
          {/* <BottomNavigationAction label="Last month" value="lastmonth" /> */}
          <BottomNavigationAction label="Year" value="year" />
        </BottomNavigation>
      </Grid>
    );
  }
}

HistoryRange.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  range: PropTypes.string.isRequired,
  setRange: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(HistoryRange);
