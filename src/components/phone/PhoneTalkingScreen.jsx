import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
import { Grid, Button, Typography } from "@material-ui/core";
import { Pause, CallEnd } from "@material-ui/icons";

class PhoneTalkingScreen extends Component {
  state = {
    disable: false
  };
  renderMedia = myCall => {
    let remoteMedia = this.refs["remoteVideo_" + myCall.session.id]; //+ myCall.session.id
    let localMedia = this.refs["localVideo_" + myCall.session.id];
    if (remoteMedia) remoteMedia.srcObject = myCall.remoteStream;
    if (localMedia) localMedia.srcObject = myCall.localStream;
  };

  render() {
    const { classes, call, theme } = this.props;

    return (
      <Grid container direction="column" justify="center">
        <Grid
          className={classes.phoneScreen}
          style={{
            height: "auto",
            backgroundColor: theme.palette.secondary.light
          }}
        >
          <Grid container direction="column" justify="center">
            <Typography
              variant="body2"
              align="center"
              style={{
                color: theme.palette.common.white,
                margin: theme.spacing(1)
              }}
            >
              {"Talking to " + call.session.remoteIdentity.displayName}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{
                color: theme.palette.common.white
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
                  call.session.hold();
                  this.setState({ disable: true });
                }}
              >
                <Pause />
              </Button>
              <Button
                variant="contained"
                disabled={this.state.disable}
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  call.session.bye();
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
          </Grid>
        </Grid>
        {call.remoteStream ? (
          <video
            className={classes.phoneScreen}
            ref={"remoteVideo_" + call.session.id} //
            autoPlay
            hidden={!call.session.sessionDescriptionHandler.constraints.video}

            //src={URL.createObjectURL(call.remoteStream)}
          />
        ) : (
          ""
        )}
        {call.localStream ? (
          <video
            className={classes.innerPhoneScreen}
            ref={"localVideo_" + call.session.id}
            //muted="muted"
            autoPlay
            hidden={!call.session.sessionDescriptionHandler.constraints.video}
            //controls
            //src={URL.createObjectURL(call.localStream)}
          />
        ) : (
          ""
        )}
        {this.renderMedia(call)}
      </Grid>
    );
  }
}

PhoneTalkingScreen.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  call: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PhoneTalkingScreen);
