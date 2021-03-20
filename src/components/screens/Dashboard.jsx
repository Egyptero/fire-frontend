import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyTodos from "./Dashboard/MyTodos";
import MyQueues from "./Dashboard/MyQueues";
import MyTeams from "./Dashboard/MyTeams";
import DashboardHeader from "./Dashboard/DashboardHeader";
import loadMyQueues from "../../functions/user/tenant/loadMyQueues";
import loadMySkillgroups from "../../functions/user/tenant/loadMySkillgroups";
import loadMyTeams from "../../functions/user/team/loadMyTeams";
import loadTodos from "../../functions/user/loadTodos";

import _ from "lodash";
import {
  Assignment,
  Block,
  Cached,
  CheckCircle,
  DirectionsRun,
  Group,
  Help,
  HourglassEmpty,
  HowToReg,
  LockOpen,
  Warning,
} from "@material-ui/icons";
import MyScroreCard from "./Dashboard/MyScroreCard";

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
  state = {
    teamData: {},
    queueData: {},
    todoData: {},
    customersWaiting: 0,
    teamStatus: {},
    todoStatus: {},
  };
  componentDidMount() {
    if (this.props.app.mySkillgroups) this.calcQueueData();
    if (this.props.app.myTeams) this.calcTeamData();
    if (this.props.app.myTodos) this.calcTodoData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.app.mySkillgroups && !prevProps.app.mySkillgroups)
      this.calcQueueData();
    if (this.props.app.myTeams && !prevProps.app.myTeams) this.calcTeamData();
    if (this.props.app.myTodos && !prevProps.app.myTodos) this.calcTodoData();
    // const { app } = this.props;
    // if (app.tenant !== prevProps.app.tenant) {
    //   loadMySkillgroups(this, (result) => {
    //     if (!result.error)
    //       loadMyQueues(this, (result) => {
    //         if (!result.error) this.calcQueueData();
    //       });
    //   });
    //   loadMyTeams(this, (result) => {
    //     if (!result.error) this.calcTeamData();
    //   });
    // }
    // if (app.todos !== prevProps.app.todos) {
    //   this.calcTodoData();
    // }
  }

  refreshTeams = () => {
    loadMyTeams(this, (result) => {
      if (!result.error) {
        this.calcTeamData();
        this.calcQueueData();
      }
    });
  };

  refreshQueues = () => {
    loadMySkillgroups(this, (result) => {
      if (!result.error)
        loadMyQueues(this, (result) => {
          if (!result.error) {
            loadMyTeams(this, (result) => {
              if (!result.error) {
                this.calcTeamData();
                this.calcQueueData();
              }
            });
          }
        });
    });
  };

  getSkillQueue = (skillgroupId) => {
    const { app } = this.props;
    if (app.myQueues) {
      let matchQueues = _.filter(
        app.myQueues,
        (queue) => queue.skillgroupId === skillgroupId
      );
      if (matchQueues && matchQueues.length > 0) return matchQueues[0].queue;
      else return "-";
    } else return 0;
  };

  getSkillNotReady = (skillgroupId) => {
    const { app } = this.props;
    const { myTeams } = app;
    const users = _.filter(
      myTeams,
      (user) =>
        user.status === "Not ready" &&
        user.skillIds.includes(skillgroupId) &&
        user.tenantIds.includes(app.tenant._id)
    );
    return users.length;
  };

  calcTodoData = () => {
    const { app } = this.props;
    const todos = app.todos ? app.todos : [];
    if (!todos) return;
    let categories = ["New", "In progress", "Completed"];

    let data = [];
    let statusCount = {
      new: 0,
      progress: 0,
      completed: 0,
    };
    if (todos)
      todos.forEach((todo) => {
        switch (todo.status) {
          case "New":
            statusCount.new += 1;
            break;
          case "Progress":
            statusCount.progress += 1;
            break;
          case "Completed":
            statusCount.completed += 1;
            break;
          default:
            break;
        }
      });
    data.push(statusCount.new);
    data.push(statusCount.progress);
    data.push(statusCount.completed);
    this.setState({ todoData: { data, categories }, todoStatus: statusCount });
  };
  calcQueueData = () => {
    const { app } = this.props;
    const skillgroups = app.mySkillgroups ? app.mySkillgroups : [];

    if (!skillgroups) return;
    let categories = [];
    let data = [];
    let queueSeries = {
      name: "Queue",
      type: "column",
      data: [],
    };
    let notreadySeries = {
      name: "Not ready",
      type: "column",
      data: [],
    };
    let customersWaiting = 0;
    if (skillgroups)
      skillgroups.forEach((skillgroup) => {
        let queueSize = this.getSkillQueue(skillgroup._id);
        customersWaiting += queueSize;
        categories.push(skillgroup.name);
        queueSeries.data.push(this.getSkillQueue(skillgroup._id));
        notreadySeries.data.push(this.getSkillNotReady(skillgroup._id));
      });

    data.push(queueSeries, notreadySeries);
    this.setState({ queueData: { data, categories }, customersWaiting });
  };
  calcTeamData = () => {
    const { app } = this.props;
    const teams = app.myTeams ? app.myTeams : [];
    if (!teams) return;
    let categories = [
      "Ready",
      "Not ready",
      "Handling",
      "Reserved",
      "Wrapup",
      "Error",
      "Logged in",
      "Logged out",
      "Unknown",
    ];
    let data = [];
    let statusCount = {
      ready: 0,
      notready: 0,
      handling: 0,
      unknown: 0,
      loggedin: 0,
      loggedout: 0,
      wrapup: 0,
      error: 0,
      reserved: 0,
    };
    if (teams)
      teams.forEach((user) => {
        switch (user.status) {
          case "Ready":
            statusCount.ready += 1;
            break;
          case "Not ready":
            statusCount.notready += 1;
            break;
          case "Handling":
            statusCount.handling += 1;
            break;
          case "Unknown":
            statusCount.unknown += 1;
            break;
          case "Wrap up":
            statusCount.wrapup += 1;
            break;
          case "Reserved":
            statusCount.reserved += 1;
            break;
          case "Error":
            statusCount.error += 1;
            break;
          case "Logged In":
            statusCount.loggedin += 1;
            break;
          case "Logged Out":
            statusCount.loggedout += 1;
            break;
          default:
            break;
        }
      });
    data.push(statusCount.ready);
    data.push(statusCount.notready);
    data.push(statusCount.handling);
    data.push(statusCount.reserved);
    data.push(statusCount.wrapup);
    data.push(statusCount.error);
    data.push(statusCount.loggedin);
    data.push(statusCount.loggedout);
    data.push(statusCount.unknown);

    this.setState({ teamData: { data, categories }, teamStatus: statusCount });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={6} lg={6} className={classes.grid}>
            <MyInteractionsSummary {...this.props} />
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.secondary.light,
                    bottomAvatarColor: theme.palette.secondary.main,
                    bottomValue: this.state.teamStatus.unknown,
                    message: "Unknown",
                    icon: () => {
                      return <Help fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.secondary.light,
                    bottomAvatarColor: theme.palette.secondary.main,
                    bottomValue: this.state.teamStatus.error,
                    message: "Error",
                    icon: () => {
                      return <Warning fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.secondary.light,
                    bottomAvatarColor: theme.palette.secondary.main,
                    bottomValue: this.state.teamStatus.loggedout,
                    message: "Log out",
                    icon: () => {
                      return <Block fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.error.light,
                    bottomAvatarColor: theme.palette.error.main,
                    bottomValue: this.state.teamStatus.loggedin,
                    message: "Log in",
                    icon: () => {
                      return <LockOpen fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.error.light,
                    bottomAvatarColor: theme.palette.error.main,
                    bottomValue: this.state.teamStatus.notready,
                    message: "Not ready",
                    icon: () => {
                      return <DirectionsRun fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.success.light,
                    bottomAvatarColor: theme.palette.success.main,
                    bottomValue: this.state.teamStatus.ready,
                    message: "Ready",
                    icon: () => {
                      return <Group fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.info.light,
                    bottomAvatarColor: theme.palette.info.main,
                    bottomValue: this.state.teamStatus.handling,
                    message: "Working",
                    icon: () => {
                      return <HowToReg fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.info.light,
                    bottomAvatarColor: theme.palette.info.main,
                    bottomValue: this.state.teamStatus.wrapup,
                    message: "Wrap up",
                    icon: () => {
                      return <HowToReg fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.primary.light,
                    bottomAvatarColor: theme.palette.primary.main,
                    bottomValue: this.state.customersWaiting,
                    message: "Queues",
                    icon: () => {
                      return <HourglassEmpty fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.secondary.light,
                    bottomAvatarColor: theme.palette.secondary.main,
                    bottomValue: this.state.todoStatus.new,
                    message: "New",
                    icon: () => {
                      return <Assignment fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.warning.light,
                    bottomAvatarColor: theme.palette.warning.main,
                    bottomValue: this.state.todoStatus.progress,
                    message: "Progress",
                    icon: () => {
                      return <Cached fontSize="large" />;
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={1}>
                <DashboardHeader
                  {...this.props}
                  params={{
                    topAvatarColor: theme.palette.success.light,
                    bottomAvatarColor: theme.palette.success.main,
                    bottomValue: this.state.todoStatus.completed,
                    message: "Completed",
                    icon: () => {
                      return <CheckCircle fontSize="large" />;
                    },
                  }}
                />
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
                    md={12}
                    lg={12}
                    className={classes.grid}
                  >
                    <MyScroreCard {...this.props} />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className={classes.grid}
                  >
                    <MyTeams
                      {...this.props}
                      data={this.state.teamData}
                      refresh={this.refreshTeams}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className={classes.grid}
                  >
                    <MyQueues
                      {...this.props}
                      data={this.state.queueData}
                      refresh={this.refreshQueues}
                    />{" "}
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
                <MyTodos {...this.props} data={this.state.todoData} />
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
