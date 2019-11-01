import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
import { Grid, Typography, Button } from "@material-ui/core";
import { CallEnd } from "@material-ui/icons";

class PhoneCallingScreen extends Component {
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
            {"Calling " + call.session.remoteIdentity.displayName}
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
                call.session.cancel();
                this.setState({ disable: true });
              }}
              style={{
                color: "red"
              }}
            >
              <CallEnd />
            </Button>
          </Grid>
          <audio src="./sound/calling.mp3" autoPlay loop hidden />
        </Grid>
      </Grid>
    );
  }
}

PhoneCallingScreen.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  call: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PhoneCallingScreen);
