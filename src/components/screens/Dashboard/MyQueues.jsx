import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Refresh, BarChart, TableChart } from "@material-ui/icons";
import {
  Card,
  IconButton,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";
import MyQueuesChart from "./MyQueuesChart";
const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "Bold",
  },
  body: {
    //fontSize: 14,
  },
}))(TableCell);

const styles = (theme) => ({
  content: {},
  grid: {},
  gridFull: {},
  card: {},
  cardContent: {
    position: "relative",
    overflow: "auto",
    padding: 0,
    //    height: "24vh",
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
  formControl: {
    marginLeft: theme.spacing(),
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  floatButton: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
  },
  floatButtonLeft: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1,
  },
});

class MyQueues extends Component {
  state = {
    view: "Graph",
  };
  getSkillQueue = (skillgroupId) => {
    const { app } = this.props;
    let matchQueues = _.filter(
      app.myQueues,
      (queue) => queue.skillgroupId === skillgroupId
    );
    if (matchQueues && matchQueues.length > 0) return matchQueues[0].queue;
    else return "-";
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
  toggelView = () => {
    const { view } = this.state;
    if (view === "Table") this.setState({ view: "Graph" });
    else if (view === "Graph") this.setState({ view: "Table" });
  };
  renderTable = () => {
    const { classes } = this.props;
    const { app } = this.props;
    const skillgroups = app.mySkillgroups ? app.mySkillgroups : [];
    return (
      <Card className={classes.card}>
        <CardHeader
          title={<b>Queues</b>}
          titleTypographyProps={{ variant: "body1" }}
          style={{ padding: this.props.theme.spacing(1) }}
        />
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={this.props.fullScreen ? { height: "75vh" } : {}}
        >
          <Table style={{ margin: 0 }}>
            <TableHead>
              <TableRow>
                <CustomTableCell size="small">
                  <Typography style={{ fontSize: 10 }}>Queue</Typography>
                </CustomTableCell>
                <CustomTableCell size="small">
                  <Typography style={{ fontSize: 10 }}>Waiting</Typography>
                </CustomTableCell>
                <CustomTableCell size="small">
                  <Typography style={{ fontSize: 10 }}>Not ready</Typography>
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skillgroups.map((skillgroup) => (
                <TableRow className={classes.row} key={skillgroup._id}>
                  <CustomTableCell size="small">
                    <Typography style={{ fontSize: 10 }}>
                      {skillgroup.name}
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell size="small">
                    <Typography style={{ fontSize: 10 }}>
                      {this.getSkillQueue(skillgroup._id)}
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell size="small">
                    <Typography style={{ fontSize: 10 }}>
                      {this.getSkillNotReady(skillgroup._id)}
                    </Typography>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };
  renderChart = () => {
    return <MyQueuesChart {...this.props} />;
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.view === "Graph" ? this.renderChart() : this.renderTable()}
        <IconButton
          className={classes.floatButton}
          onClick={this.toggelView}
          size="small"
        >
          {this.state.view === "Graph" ? (
            <TableChart fontSize="small" />
          ) : (
            <BarChart fontSize="small" />
          )}
        </IconButton>
        <IconButton
          className={classes.floatButtonLeft}
          onClick={this.props.refresh}
          size="small"
        >
          <Refresh fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  }
}

MyQueues.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyQueues);
