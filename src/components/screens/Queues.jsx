import React, { Component } from "react";
import { Card, Grid, CardHeader, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FacebookQueueCardSummary from "./Queues/FacebookQueueCardSummary";
import TwitterQueueCardSummary from "./Queues/TwitterQueueCardSummary";
import CallQueueCardSummary from "./Queues/CallQueueCardSummary";
import ChatQueueCardSummary from "./Queues/ChatQueueCardSummary";
import EmailQueueCardSummary from "./Queues/EmailQueueCardSummary";
import ProjectQueueCardSummary from "./Queues/ProjectQueueCardSummary";
import WhatsAppQueueCardSummary from "./Queues/WhatsAppQueueCardSummary";
import InstagramQueueCardSummary from "./Queues/InstagramQueueCardSummary";
import QueueCardSummary from "./Queues/QueueCardSummary";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "50%",
    minHeight: "50%"
  },
  fullgrid: {
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
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "34vh",
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

class Queues extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={9}
            className={classes.fullgrid}
          >
            <Grid className={classes.content} container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <FacebookQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <TwitterQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <InstagramQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <CallQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <EmailQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <ChatQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <WhatsAppQueueCardSummary {...this.props} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className={classes.grid}>
                <ProjectQueueCardSummary {...this.props} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} className={classes.fullgrid}>
            <QueueCardSummary {...this.props} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Queues.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Queues);
