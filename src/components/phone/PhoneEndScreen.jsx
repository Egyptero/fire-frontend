import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
import { Grid, Typography } from "@material-ui/core";

class PhoneEndScreen extends Component {
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
            {"Call with " + call.session.remoteIdentity.uri.user}
          </Typography>
          <Typography
            variant="h6"
            align="center"
            style={{
              color: theme.palette.common.white
              //              margin: theme.spacing(1)
            }}
          >
            {call.status}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

PhoneEndScreen.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  call: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PhoneEndScreen);
