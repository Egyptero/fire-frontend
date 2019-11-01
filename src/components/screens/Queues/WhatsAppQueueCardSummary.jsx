import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ArrowDropDown,
  ArrowDropUp,
  Remove,
  Refresh,
  MoreVert
} from "@material-ui/icons";
import loadMyWhatsAppQueues from "../../../functions/user/tenant/loadMyWhatsAppQueues";
import loadMySkillgroups from "../../../functions/user/tenant/loadMySkillgroups";

const styles = theme => ({
  content: {},
  grid: {},
  fullgrid: {},
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
  },
  floatButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1
  },
  floatButtonLeft: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1
  }
});

class WhatsAppQueueCardSummary extends Component {
  state = {
    queue: 0,
    trend: "neutral"
  };
  componentDidMount() {
    const { app } = this.props;
    if (!app.mySkillgroups)
      loadMySkillgroups(this, result => {
        if (!result.error) {
          if (!app.myWhatsAppQueues)
            loadMyWhatsAppQueues(this, result => {
              if (!result.error) this.prepareData();
            });
          else this.prepareData();
        }
      });
    else if (!app.myWhatsAppQueues)
      loadMyWhatsAppQueues(this, result => {
        if (!result.error) this.prepareData();
      });
    else this.prepareData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (app.tenant !== prevProps.app.tenant)
      loadMySkillgroups(this, result => {
        if (!result.error)
          loadMyWhatsAppQueues(this, result => {
            if (!result.error) this.prepareData();
          });
      });
  }
  reload = () => {
    loadMySkillgroups(this, result => {
      if (!result.error)
        loadMyWhatsAppQueues(this, result => {
          if (!result.error) this.prepareData();
        });
    });
  };
  switchToSkillQueue = skillId => {};
  renderTrend = trend => {
    switch (trend) {
      case "up":
        return (
          <ArrowDropUp
            style={{
              color: "red"
            }}
            fontSize="small"
          />
        );
      case "neutral":
        return (
          <Remove
            style={{
              color: "orange"
            }}
            fontSize="small"
          />
        );
      case "down":
        return (
          <ArrowDropDown
            style={{
              color: "green"
            }}
            fontSize="small"
          />
        );
      default:
        break;
    }
  };
  prepareData = () => {
    const { app } = this.props;
    let queue = 0;
    if (app.myWhatsAppQueues) {
      app.myWhatsAppQueues.forEach(emailQueue => {
        queue += emailQueue.queue;
      });
    }
    let trend = "neutral";

    if (queue > this.state.queue) trend = "up";
    else if (queue < this.state.queue) trend = "down";
    else if (queue === this.state.queue) trend = "neutral";

    this.setState({
      queue,
      trend
    });
  };
  getQueue = skillId => {
    const { app } = this.props;
    if (app.myWhatsAppQueues) {
      const targetQueues = app.myWhatsAppQueues.filter(
        queue => queue.skillgroupId === skillId
      );
      if (targetQueues.length > 0) return targetQueues[0].queue;
    }
    return "NA";
  };
  render() {
    const { theme, app, classes } = this.props;
    const mySkillgroups = app.mySkillgroups ? app.mySkillgroups : [];
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardHeader
            style={{ backgroundColor: "#25d366" }}
            title={
              <Grid container alignContent="center" justify="center">
                <img
                  src="./imgs/whatsappwhitelogo.png"
                  alt="whatsapp"
                  height={theme.spacing(3)}
                  width={theme.spacing(3)}
                />
              </Grid>
            }
          />
          <CardContent className={classes.cardContent}>
            <Grid container direction="column" spacing={1}>
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{
                  marginTop: theme.spacing(2),
                  marginBottom: theme.spacing(2)
                }}
              >
                <Typography variant="h3">{this.state.queue}</Typography>
              </Grid>
              {mySkillgroups.map(skillgroup => {
                return (
                  <Grid
                    key={skillgroup._id}
                    item
                    style={{ marginBottom: theme.spacing(1) * 0.5 }}
                  >
                    <Grid
                      container
                      style={{
                        borderRadius: "2em",
                        background: "#F3F3F3"
                      }}
                      spacing={1}
                    >
                      <Grid item xs={9}>
                        <Typography
                          variant="body2"
                          color="inherit"
                          style={{ marginLeft: theme.spacing(1) }}
                        >
                          {skillgroup.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography
                          variant="body2"
                          color="inherit"
                          align="right"
                          style={{ marginRight: theme.spacing(1) }}
                        >
                          {this.getQueue(skillgroup._id)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
        <IconButton className={classes.floatButton}>
          <MoreVert style={{ color: "white" }} />
        </IconButton>
        <IconButton className={classes.floatButtonLeft} onClick={this.reload}>
          <Refresh style={{ color: "white" }} />
        </IconButton>
      </React.Fragment>
    );
  }
}

WhatsAppQueueCardSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(
  WhatsAppQueueCardSummary
);
