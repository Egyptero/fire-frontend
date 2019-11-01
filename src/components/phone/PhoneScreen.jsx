import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import styles from "../primaryapp/appStyles";
import PhoneTalkingScreen from "./PhoneTalkingScreen";
import PhoneInviteScreen from "./PhoneInviteScreen";
import PhoneCallingScreen from "./PhoneCallingScreen";
import PhoneEndScreen from "./PhoneEndScreen";

class PhoneScreen extends Component {
  state = {};
  render() {
    const { classes } = this.props;
    const { myCalls } = this.props.app;
    return (
      <React.Fragment>
        <Grid
          container
          className={classes.outerPhoneScreen}
          direction="column-reverse"
        >
          {myCalls
            ? myCalls.map(myCall => {
                switch (myCall.status) {
                  case "Invite": //user is invited to call
                    return (
                      <PhoneInviteScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Calling": // User is calling someone
                    return (
                      <PhoneCallingScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Trying": // User is trying to reach someone
                    return (
                      <PhoneCallingScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Talking": //User is talking to someone
                    return (
                      <PhoneTalkingScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Ringing": //user is ringing at someone
                    return (
                      <PhoneCallingScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Failed": //Call failed
                    return (
                      <PhoneEndScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Cancelled": //Call Cancelled
                    return (
                      <PhoneEndScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Terminated": //Call Terminated
                    return (
                      <PhoneEndScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  case "Busy": //Caller Rejected the call
                    return (
                      <PhoneEndScreen
                        {...this.props}
                        call={myCall}
                        key={myCall.session.id}
                      />
                    );
                  default:
                    break;
                }
                return "";
              })
            : ""}
        </Grid>
      </React.Fragment>
    );
  }
}

PhoneScreen.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PhoneScreen);
