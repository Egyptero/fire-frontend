import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider
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
import loadMyQueues from "../../../functions/user/tenant/loadMyQueues";
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
  cardContent: {},
  cardContentLong: {
    position: "relative",
    overflow: "auto",
    height: "70vh",
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

class QueueCardSummary extends Component {
  state = {
    queue: 0,
    trend: "neutral"
  };
  componentDidMount() {
    const { app } = this.props;

    if (!app.mySkillgroups)
      loadMySkillgroups(this, result => {
        if (!result.error) {
          if (!app.myQueues)
            loadMyQueues(this, result => {
              if (!result.error) this.prepareData();
            });
          else this.prepareData();
        }
      });
    else if (!app.myQueues)
      loadMyQueues(this, result => {
        if (!result.error) this.prepareData();
      });
    else this.prepareData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (app.tenant !== prevProps.app.tenant)
      loadMySkillgroups(this, result => {
        if (!result.error)
          loadMyQueues(this, result => {
            if (!result.error) this.prepareData();
          });
      });
  }
  reload = () => {
    loadMySkillgroups(this, result => {
      if (!result.error)
        loadMyQueues(this, result => {
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
    if (app.myQueues) {
      app.myQueues.forEach(allQueue => {
        queue += allQueue.queue;
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
    if (app.myQueues) {
      const targetQueues = app.myQueues.filter(
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
          // style={{ backgroundColor: "#25d366" }}
          // title={
          //   <Grid container alignContent="center" justify="center">
          //     <img
          //       src="./imgs/whatsappwhitelogo.png"
          //       alt="whatsapp"
          //       height={theme.spacing(3)}
          //       width={theme.spacing(3)}
          //     />
          //   </Grid>
          // }
          />
          <CardContent className={classes.cardContentLong}>
            <Grid container direction="column" spacing={1}>
              <Grid
                container
                direction="column"
                style={{
                  marginTop: theme.spacing(3),
                  marginBottom: theme.spacing(1)
                }}
              >
                <Grid container alignContent="center" justify="center">
                  <Typography variant="h4">Queue now</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                alignContent="center"
                justify="center"
                style={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(4)
                }}
              >
                <Typography variant="h3">{this.state.queue}</Typography>
              </Grid>

              {mySkillgroups.map(skillgroup => {
                return (
                  <Grid
                    key={skillgroup._id}
                    item
                    style={{
                      marginBottom: theme.spacing(1) * 0.5
                    }}
                  >
                    <Grid container direction="column">
                      <Divider variant="middle" />
                      <Grid
                        container
                        alignContent="center"
                        justify="center"
                        style={{
                          marginTop: theme.spacing(1),
                          marginBottom: theme.spacing(1) * 0.5
                        }}
                      >
                        <Typography variant="h5" color="inherit">
                          {skillgroup.name}
                        </Typography>
                      </Grid>
                      <Grid container alignContent="center" justify="center">
                        <Typography variant="h5" color="inherit">
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
          <MoreVert />
        </IconButton>
        <IconButton className={classes.floatButtonLeft} onClick={this.reload}>
          <Refresh />
        </IconButton>
      </React.Fragment>
    );
  }
}

QueueCardSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(QueueCardSummary);
