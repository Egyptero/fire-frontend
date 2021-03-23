import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyInteraction from "./Dashboard/MyInteractionsSummary";

const styles = theme => ({
  content: {
    flexGrow: 1,
    //height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%"
  }
});

class MyInteractions extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.grid}>
            <MyInteraction {...this.props} fullScreen />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

MyInteractions.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MyInteractions);
