import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyTodos from "./Dashboard/MyTodos";
import MyInteractionsSummary from "./Dashboard/MyInteractionsSummary";
import MyQueues from "./Dashboard/MyQueues";
import MyTeams from "./Dashboard/MyTeams";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    height: "86vh",
    //background: theme.palette.primary.light
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "50%",
    minHeight: "50%",
  },
  gridFull: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
            <MyInteractionsSummary {...this.props} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.gridFull}>
            <Grid className={classes.content} container spacing={1}>
              <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
                <MyTeams {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
                <MyQueues {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
                <Card className={classes.card}>
                  <CardHeader title="Score Card" />
                  <CardContent />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className={classes.gridFull}>
            <MyTodos {...this.props} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Dashboard);
