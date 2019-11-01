import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
import { Grid, Typography, Button } from "@material-ui/core";
import { Call, CallEnd, VideoCall } from "@material-ui/icons";

class PhoneInviteScreen extends Component {
  state = {
    disable: false
  };
  render() {
    const { classes, call, theme } = this.props;
    return (
      <Grid
        className={classes.phoneScreen}
        style={{
          height: "8em",
          backgroundColor: theme.palette.secondary.light
        }}
      >
        <Grid container direction="column" justify="center">
          {/* <Typography variant="h6" color="textSecondary">
            {call.session.remoteIdentity.uri}
          </Typography> */}
          <Typography
            variant="body2"
            align="center"
            style={{
              color: theme.palette.common.white,
              margin: theme.spacing(1)
            }}
          >
            {"Call from " + call.session.remoteIdentity.displayName}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            style={{
              color: theme.palette.common.white
              //              margin: theme.spacing(1)
            }}
          >
            {call.session.remoteIdentity.uri.user}
          </Typography>
          <Grid container direction="row" justify="center">
            <Button
              variant="contained"
              disabled={this.state.disable}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                call.session.accept({
                  sessionDescriptionHandlerOptions: {
                    constraints: {
                      audio: {
                        optional: [
                          { googEchoCancellation: true },
                          { googAutoGainControl: true },
                          { googNoiseSuppression: true },
                          { googHighpassFilter: true },
                          { googAudioMirroring: false },
                          { googNoiseSuppression2: true },
                          { googEchoCancellation2: true },
                          { googAutoGainControl2: true },
                          { googDucking: false }
                        ]
                      },
                      video: false
                    }
                  }
                });
                this.setState({ disable: true });
              }}
              style={{
                marginRight: theme.spacing(1),
                color: "#7cb342"
              }}
            >
              <Call />
            </Button>
            <Button
              variant="contained"
              disabled={this.state.disable}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                call.session.accept({
                  sessionDescriptionHandlerOptions: {
                    constraints: {
                      audio: {
                        optional: [
                          { googEchoCancellation: true },
                          { googAutoGainControl: true },
                          { googNoiseSuppression: true },
                          { googHighpassFilter: true },
                          { googAudioMirroring: false },
                          { googNoiseSuppression2: true },
                          { googEchoCancellation2: true },
                          { googAutoGainControl2: true },
                          { googDucking: false }
                        ]
                      },
                      video: true
                    }
                  }
                });
                this.setState({ disable: true });
              }}
              style={{
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
                color: "#7cb342"
              }}
            >
              <VideoCall />
            </Button>
            <Button
              variant="contained"
              disabled={this.state.disable}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                call.session.reject();
                this.setState({ disable: true });
              }}
              style={{
                marginLeft: theme.spacing(1),
                color: "red"
              }}
            >
              <CallEnd />
            </Button>
          </Grid>
          <audio src="./sound/ring1.mp3" autoPlay loop hidden />
        </Grid>
      </Grid>
    );
  }
}

PhoneInviteScreen.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  call: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PhoneInviteScreen);
