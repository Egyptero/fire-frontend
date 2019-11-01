import React, { Component } from "react";
import MainBar from "./components/MainBar";
import MainMenu from "./components/MainMenu";
import ProfileMenu from "./components/ProfileMenu";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../primaryapp/appStyles";

class TopSideDrawer extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <MainBar
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
        <ProfileMenu
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
        <MainMenu
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      </React.Fragment>
    );
  }
}

TopSideDrawer.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TopSideDrawer);
