import React, { Component } from "react";
import { Grid, Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Designer from "./Designer/Designer";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    //height: "86vh",
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    //    maxWidth: "100%",
    minHeight: "100%",
    //    minWidth: "100%"
  },
});

class WorkflowDetails extends Component {
  state = {};
  render() {
    const { classes, source } = this.props;
    return (
      <Grid
        item
        xs={12}
        sm={source.getDrawerWidth()}
        md={source.getDrawerWidth()}
        lg={source.getDrawerWidth()}
        className={classes.grid}
      >
        <Card className={classes.card}>
          <Designer {...this.props} />
        </Card>
      </Grid>
    );
  }
}

WorkflowDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WorkflowDetails);
