import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  ArrowDropDown,
  ArrowDropUp,
  MoreVert,
  Refresh,
  Remove,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import loadMySkillgroups from "../../../functions/user/tenant/loadMySkillgroups";
import loadMyTwitterQueues from "../../../functions/user/tenant/loadMyTwitterQueues";

const styles = (theme) => ({
  content: {},
  grid: {},
  fullgrid: {},
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
  cardContent: {
    position: "relative",
    overflow: "auto",
    height: "34vh",
    minWidth: "100%",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  floatButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
  floatButtonLeft: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    zIndex: 1,
  },
});

class TwitterQueueCardSummary extends Component {
  state = {
    data: [
      {
        label: "Mentions",
        trend: "neutral", //up down neutral
        value: 0,
      },
      {
        label: "Hashtags",
        trend: "neutral",
        value: 0,
      },
      {
        label: "Direct Msgs",
        trend: "neutral",
        value: 0,
      },
    ],
  };
  componentDidMount() {
    const { app } = this.props;
    if (!app.mySkillgroups)
      loadMySkillgroups(this, (result) => {
        if (!result.error) {
          if (!app.myTwitterQueues)
            loadMyTwitterQueues(this, (result) => {
              if (!result.error) this.prepareData();
            });
          else this.prepareData();
        }
      });
    else if (!app.myTwitterQueues)
      loadMyTwitterQueues(this, (result) => {
        if (!result.error) this.prepareData();
      });
    else this.prepareData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (app.tenant !== prevProps.app.tenant)
      loadMySkillgroups(this, (result) => {
        if (!result.error)
          loadMyTwitterQueues(this, (result) => {
            if (!result.error) this.prepareData();
          });
      });
  }
  reload = () => {
    loadMySkillgroups(this, (result) => {
      if (!result.error)
        loadMyTwitterQueues(this, (result) => {
          if (!result.error) this.prepareData();
        });
    });
  };
  switchToSkillQueue = (skillId) => {};
  renderTrend = (trend) => {
    switch (trend) {
      case "up":
        return (
          <ArrowDropUp
            style={{
              color: "red",
            }}
            fontSize="small"
          />
        );
      case "neutral":
        return (
          <Remove
            style={{
              color: "orange",
            }}
            fontSize="small"
          />
        );
      case "down":
        return (
          <ArrowDropDown
            style={{
              color: "green",
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
    let mentions = 0;
    let hashtags = 0;
    let dm = 0;
    if (app.myTwitterQueues) {
      app.myTwitterQueues.forEach((queue) => {
        mentions += queue.mentionsQueue;
        hashtags += queue.hashtagQueue;
        dm += queue.dmQueue;
      });
    }
    let mentionsTrend = "neutral";
    let hashtagsTrend = "neutral";
    let dmsTrend = "neutral";
    this.state.data.forEach((row) => {
      if (row.label === "Mentions") {
        if (mentions > row.value) mentionsTrend = "up";
        else if (mentions < row.value) mentionsTrend = "down";
        else if (mentions === row.value) mentionsTrend = "neutral";
      }
      if (row.label === "Hashtags") {
        if (hashtags > row.value) hashtagsTrend = "up";
        else if (hashtags < row.value) hashtagsTrend = "down";
        else if (hashtags === row.value) hashtagsTrend = "neutral";
      }
      if (row.label === "Direct Msgs") {
        if (dm > row.value) dmsTrend = "up";
        else if (dm < row.value) dmsTrend = "down";
        else if (dm === row.value) dmsTrend = "neutral";
      }
    });

    this.setState({
      data: [
        {
          label: "Mentions",
          trend: mentionsTrend, //up down neutral
          value: mentions,
        },
        {
          label: "Hashtags",
          trend: hashtagsTrend,
          value: hashtags,
        },
        {
          label: "Direct Msgs",
          trend: dmsTrend,
          value: dm,
        },
      ],
    });
  };
  getQueue = (skillId) => {
    const { app } = this.props;
    if (app.myTwitterQueues) {
      const targetQueues = app.myTwitterQueues.filter(
        (queue) => queue.skillgroupId === skillId
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
            style={{ backgroundColor: "#00acee" }}
            title={
              <Grid container alignContent="center" justify="center">
                <img
                  src="./imgs/twitterwhitelogo.png"
                  alt="twitter"
                  height={theme.spacing(3)}
                  width={theme.spacing(3)}
                />
              </Grid>
            }
          />
          <CardContent className={classes.cardContent}>
            <Grid container direction="column" spacing={1}>
              <Table size="small" style={{ marginBottom: theme.spacing(3) }}>
                <TableBody>
                  {this.state.data.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell component="th" scope="row">
                        {row.label}
                      </TableCell>
                      <TableCell align="center">
                        {this.renderTrend(row.trend)}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {mySkillgroups.map((skillgroup) => {
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
                        background: "#F3F3F3",
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

TwitterQueueCardSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TwitterQueueCardSummary);
