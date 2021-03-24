import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Refresh, TableChart, BarChart } from "@material-ui/icons";
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
//import _ from "lodash";
import MyTeamsChart from "./MyTeamsChart";
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
    //height: "24vh",
    padding: 0,
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

class MyTeams extends Component {
  state = {
    view: "Graph",
  };
  changeView = (event) => {
    this.setState({ view: event.target.value });
  };
  toggelView = () => {
    const { view } = this.state;
    if (view === "Table") this.setState({ view: "Graph" });
    else if (view === "Graph") this.setState({ view: "Table" });
  };
  renderTable = () => {
    const { classes } = this.props;
    const { app } = this.props;
    const teams = app.myTeams ? app.myTeams : [];
    return (
      <Card className={classes.card}>
        <CardHeader title="Team" />
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={this.props.fullScreen ? { height: "75vh" } : {}}
        >
          <Table style={{ margin: 0 }} size="small">
            <TableHead>
              <TableRow>
                <CustomTableCell size="small">
                  <Typography style={{ fontSize: 10 }}>User</Typography>
                </CustomTableCell>
                <CustomTableCell size="small">
                  <Typography style={{ fontSize: 10 }}>Status</Typography>
                </CustomTableCell>
                <CustomTableCell size="small">
                  <Typography style={{ fontSize: 10 }}>Since</Typography>
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((user) => (
                <TableRow className={classes.row} key={user._id}>
                  <CustomTableCell>
                    <Typography style={{ fontSize: 10 }}>
                      {user.firstname + " " + user.lastname}
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography style={{ fontSize: 10 }}>
                      {user.status}
                    </Typography>
                  </CustomTableCell>
                  <CustomTableCell>
                    <Typography style={{ fontSize: 10 }}>
                      {"00:00:00"}
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
    return <MyTeamsChart {...this.props} />;
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

MyTeams.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
};
export default withStyles(styles, { withTheme: true })(MyTeams);
