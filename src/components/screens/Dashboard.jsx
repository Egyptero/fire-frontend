import React, { Component } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Grow,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyTodos from "./Dashboard/MyTodos";
import MyInteractionsSummary from "./Dashboard/MyInteractionsSummary";
import MyQueues from "./Dashboard/MyQueues";
import MyTeams from "./Dashboard/MyTeams";
import DashboardHeader from "./Dashboard/DashboardHeader";

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
    const { classes,theme } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
            <MyInteractionsSummary {...this.props} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <DashboardHeader {...this.props} params={{
                  topAvatarColor:theme.palette.info.light,
                  bottomAvatarColor:theme.palette.info.light,
                }}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <DashboardHeader {...this.props} params={{
                  topAvatarColor:theme.palette.error.light,
                  bottomAvatarColor:theme.palette.error.light,
                }}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <DashboardHeader {...this.props} params={{
                  topAvatarColor:theme.palette.warning.light,
                  bottomAvatarColor:theme.palette.warning.light,
                }}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <DashboardHeader {...this.props} params={{
                  topAvatarColor:theme.palette.primary.light,
                  bottomAvatarColor:theme.palette.primary.light,
                }}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <DashboardHeader {...this.props} params={{
                  topAvatarColor:theme.palette.secondary.light,
                  bottomAvatarColor:theme.palette.secondary.light,
                }}/>
              </Grid>
              <Grid item xs={6} sm={3} md={2} lg={2}>
                <DashboardHeader {...this.props} params={{
                  topAvatarColor:theme.palette.error.main,
                  bottomAvatarColor:theme.palette.error.main,
                }}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className={classes.gridFull}
              >
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className={classes.grid}
                  >
                    <MyTeams {...this.props} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className={classes.grid}
                  >
                    <MyQueues {...this.props} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className={classes.grid}
                  >
                    <Card className={classes.card}>
                      <CardHeader title="Score Card" />
                      <CardContent />
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className={classes.gridFull}
              >
                <MyTodos {...this.props} />
              </Grid>
            </Grid>
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
