import React, { Component } from "react";
import { Grid, Fab, Tooltip } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";

class FireClientConnect extends Component {
  state = {};

  onPower = () => {
    const { login, logout } = this.props.app.buttons;
    const { client } = this.props.app;
    if (!login && logout) {
      client.emit("message", {
        action: "logout",
        date: Date.now(),
        token: this.props.app.token
      });
    } else if (login && !logout) {
      client.emit("message", {
        action: "login",
        date: Date.now(),
        token: this.props.app.token
      });
    }
  };

  render() {
    const { app, classes } = this.props;
    const { buttons } = app;
    if (buttons) {
      let classColor = classes.login;
      let caption = "Start receiving interactions";
      const { login, logout } = this.props.app.buttons;
      if (!login && logout) {
        classColor = classes.logout;
        caption = "Stop receiving interactions ";
      }
      return (
        <Grid container direction="row" spacing={1}>
          <Grid item xs={2}>
            <Tooltip title={caption} aria-label="ODI Connection">
              <Fab
                aria-label="ODI Connection"
                onClick={this.onPower}
                className={classColor}
                //size="small"
              >
                <PowerSettingsNew />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

FireClientConnect.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FireClientConnect);
