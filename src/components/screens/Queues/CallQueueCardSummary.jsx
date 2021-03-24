import React, { Component } from "react";
import {
  Grid,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ArrowDropDown,
  ArrowDropUp,
  Remove,
  Refresh,
  MoreVert,
  Call,
} from "@material-ui/icons";
import loadMyCallQueues from "../../../functions/user/tenant/loadMyCallQueues";
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
    position: "relative",
    overflow: "auto",
    padding: theme.spacing(1),
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

class CallQueueCardSummary extends Component {
  state = {
    data: [
      {
        label: "Inbound",
        trend: "neutral", //up down neutral
        value: 0,
      },
      {
        label: "Outbound",
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
          if (!app.myCallQueues)
            loadMyCallQueues(this, (result) => {
              if (!result.error) this.prepareData();
            });
          else this.prepareData();
        }
      });
    else if (!app.myCallQueues)
      loadMyCallQueues(this, (result) => {
        if (!result.error) this.prepareData();
      });
    else this.prepareData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (app.tenant !== prevProps.app.tenant)
      loadMySkillgroups(this, (result) => {
        if (!result.error)
          loadMyCallQueues(this, (result) => {
            if (!result.error) this.prepareData();
          });
      });
  }
  reload = () => {
    loadMySkillgroups(this, (result) => {
      if (!result.error)
        loadMyCallQueues(this, (result) => {
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
    let inbound = 0;
    let outbound = 0;
    if (app.myCallQueues) {
      app.myCallQueues.forEach((queue) => {
        inbound += queue.InboundQueue;
        outbound += queue.OutboundQueue;
      });
    }
    let inboundTrend = "neutral";
    let outboundTrend = "neutral";

    this.state.data.forEach((row) => {
      if (row.label === "Inbound") {
        if (inbound > row.value) inboundTrend = "up";
        else if (inbound < row.value) inboundTrend = "down";
        else if (inbound === row.value) inboundTrend = "neutral";
      }
      if (row.label === "Outbound") {
        if (outbound > row.value) outboundTrend = "up";
        else if (outbound < row.value) outboundTrend = "down";
        else if (outbound === row.value) outboundTrend = "neutral";
      }
    });

    this.setState({
      data: [
        {
          label: "Inbound",
          trend: inboundTrend, //up down neutral
          value: inbound,
        },
        {
          label: "Outbound",
          trend: outboundTrend,
          value: outbound,
        },
      ],
    });
  };
  getQueue = (skillId) => {
    const { app } = this.props;
    if (app.myCallQueues) {
      const targetQueues = app.myCallQueues.filter(
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
              backgroundColor: theme.palette.success.dark,
              padding: theme.spacing(1),
            }} //"#548235"
            title={
              <Grid container alignContent="center" justify="center">
                <Call style={{ color: theme.palette.common.white }} />
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

CallQueueCardSummary.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CallQueueCardSummary);
