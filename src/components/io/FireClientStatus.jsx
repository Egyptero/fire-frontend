import React, { Component } from "react";
import {
  Grid,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
class FireClientStatus extends Component {
  state = {
    selected: "",
    statusList: [],
  };

  onChangeStatus = (event) => {
    let selected = event.target.value;
    const { client } = this.props.app;
    client.emit("message", {
      action: "state",
      date: Date.now(),
      token: this.props.app.token,
      status: selected,
    });
  };

  buildStatusList = () => {
    const { app } = this.props;
    const { buttons, status, nextStatus } = app;

    let statusList = [];
    let defaultStatus = ["Ready", "Not ready", "Wrap up"];

    if (defaultStatus.indexOf(status) < 0) {
      if (nextStatus === status) statusList.push(status);
      else statusList.push(status + "->" + nextStatus);
    }
    if (buttons.ready) statusList.push("Ready");
    if (buttons.notready) statusList.push("Not ready");
    if (buttons.wrapup) statusList.push("Wrap up");

    //this.setState({ selected: status });
    this.state.selected = status;
    if (nextStatus !== status)
      //this.setState({ selected: status + "->" + nextStatus });
      this.state.selected = status + "->" + nextStatus;
    //this.setState({ statusList });
    this.state.statusList = statusList;
  };

  render() {
    const { app, classes, theme } = this.props;
    const { buttons } = app;
    if (buttons && (buttons.ready || buttons.notready || buttons.wrapup)) {
      this.buildStatusList();
      return (
        <Grid container>
          <FormControl
            style={{
              width: "100%",
              marginLeft: theme.spacing(1.5),
              marginRight: theme.spacing(1),
            }}
          >
            <Tooltip title="Change status" aria-label="Add">
              <Select
                value={this.state.selected}
                onChange={this.onChangeStatus}
                disableUnderline
                inputProps={{
                  classes: {
                    root: classes.fireClientStatus.whiteColor,
                    icon: classes.fireClientStatus.icon,
                  },
                }}
              >
                {this.state.statusList.map((status) => {
                  return (
                    <MenuItem key={status} value={status}>
                      <Typography variant="caption">{status}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </Tooltip>
          </FormControl>
        </Grid>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

FireClientStatus.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FireClientStatus);
