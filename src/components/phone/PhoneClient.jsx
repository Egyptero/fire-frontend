import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
import { Grid, Tooltip, Fab, Typography } from "@material-ui/core";
import { Dialpad } from "@material-ui/icons";
import PhoneMenu from "./PhoneMenu";

class PhoneClient extends Component {
  state = {
    anchorEl: null,
  };

  handlePhoneMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handlePhoneMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    let { sipState, user, tenant } = this.props.app;
    if (!user || !tenant) return <React.Fragment />;
    if (user.overrideUserConf) {
      if (!user.phone) return <React.Fragment />;
    } else if (!tenant.voip) return <React.Fragment />;

    let buttonColor = sipState && sipState === "Registered" ? "#7cb342" : "red";
    if (!sipState) sipState = "Unregistered";

    return (
      <React.Fragment>
        {sipState ? (
          <Grid container spacing={1} direction="row">
            <Typography variant="h6" color="inherit" noWrap>
              {user.sipUserName}
            </Typography>
            <Tooltip title={"Phone " + sipState} aria-label="Phone">
              <Fab
                size="small"
                aria-label="Phone"
                onClick={this.handlePhoneMenuOpen}
                style={{
                  backgroundColor: "#fafafa",
                  color: buttonColor,
                  "&:hover": {
                    backgroundColor: "#fafafa",
                  },
                  width: 35,
                  height: 35,
                  boxShadow: "none",
                  textTransform: "none",
                }}
              >
                <Dialpad fontSize="small" />
              </Fab>
            </Tooltip>
            <PhoneMenu
              anchorEl={this.state.anchorEl}
              handlePhoneMenuClose={this.handlePhoneMenuClose}
              {...this.props}
            />
          </Grid>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
PhoneClient.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PhoneClient);
