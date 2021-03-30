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
  Instagram,
  MoreVert,
  Refresh,
  Remove,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import loadMyInstagramQueues from "../../../functions/user/tenant/loadMyInstagramQueues";
import loadMySkillgroups from "../../../functions/user/tenant/loadMySkillgroups";

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
  },
  floatButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(1),
    zIndex: 1,
  },
  floatButtonLeft: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(1),
    zIndex: 1,
  },
});

class InstagramQueueCardSummary extends Component {
  state = {
    data: [
      {
        label: "Comments",
        trend: "neutral", //up down neutral
        value: 0,
      },
      {
        label: "Mentions",
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
          if (!app.myInstagramQueues)
            loadMyInstagramQueues(this, (result) => {
              if (!result.error) this.prepareData();
            });
          else this.prepareData();
        }
      });
    else if (!app.myInstagramQueues)
      loadMyInstagramQueues(this, (result) => {
        if (!result.error) this.prepareData();
      });
    else this.prepareData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (app.tenant !== prevProps.app.tenant)
      loadMySkillgroups(this, (result) => {
        if (!result.error)
          loadMyInstagramQueues(this, (result) => {
            if (!result.error) this.prepareData();
          });
      });
  }
  reload = () => {
    loadMySkillgroups(this, (result) => {
      if (!result.error)
        loadMyInstagramQueues(this, (result) => {
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
    let comments = 0;
    let mentions = 0;
    let dm = 0;
    if (app.myInstagramQueues) {
      app.myInstagramQueues.forEach((queue) => {
        comments += queue.commentsQueue;
        mentions += queue.mentionsQueue;
        dm += queue.dmQueue;
      });
    }
    let commentsTrend = "neutral";
    let mentionsTrend = "neutral";
    let dmsTrend = "neutral";
    this.state.data.forEach((row) => {
      if (row.label === "Comments") {
        if (comments > row.value) commentsTrend = "up";
        else if (comments < row.value) commentsTrend = "down";
        else if (comments === row.value) commentsTrend = "neutral";
      }
      if (row.label === "Mentions") {
        if (mentions > row.value) mentionsTrend = "up";
        else if (mentions < row.value) mentionsTrend = "down";
        else if (mentions === row.value) mentionsTrend = "neutral";
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
          label: "Comments",
          trend: commentsTrend, //up down neutral
          value: comments,
        },
        {
          label: "Mentions",
          trend: mentionsTrend,
          value: mentions,
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
    if (app.myInstagramQueues) {
      const targetQueues = app.myInstagramQueues.filter(
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
            style={{
              backgroundColor: theme.palette.error.dark,
              padding: theme.spacing(1),
            }} //"#7f1734"
            title={
              <Grid container alignContent="center" justify="center">
                <Instagram style={{ color: theme.palette.common.white }} />
              </Grid>
            }
          />
          <CardContent className={classes.cardContent}>
            <Grid container direction="column" spacing={1}>
              <Table size="small" style={{ marginBottom: theme.spacing(3) }}>
                <TableBody>
                  {this.state.data.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ fontSize: 11 }}
                      >
                        {row.label}
                      </TableCell>
                      <TableCell align="center" style={{ fontSize: 11 }}>
                        {this.renderTrend(row.trend)}
                      </TableCell>
                      <TableCell align="right" style={{ fontSize: 11 }}>
                        {row.value}
                      </TableCell>
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
                          variant="caption"
                          color="inherit"
                          style={{ marginLeft: theme.spacing(1) }}
                        >
                          {skillgroup.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Grid container justify="flex-end">
                          <Typography
                            variant="caption"
                            color="inherit"
                            align="right"
                            style={{ marginRight: theme.spacing(1) }}
                          >
                            {this.getQueue(skillgroup._id)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
        <IconButton className={classes.floatButton} size="small">
          <MoreVert style={{ color: "white" }} fontSize="small" />
        </IconButton>
        <IconButton
          className={classes.floatButtonLeft}
          onClick={this.reload}
          size="small"
        >
          <Refresh style={{ color: "white" }} fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  }
}

InstagramQueueCardSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  InstagramQueueCardSummary
);
