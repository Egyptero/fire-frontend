import React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styles from "./primaryapp/appStyles";
import LeftSideDrawer from "./leftside/LeftSideDrawer";
import TopSideDrawer from "./topside/TopSideDrawer";
import Main from "./main/Main";
import PhoneScreen from "./phone/PhoneScreen";
import MasterAdd from "./buttons/add/MasterAdd";

class PrimaryApp extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    open: false
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleScreenChange = screen => {
    const { app } = this.props;
    app.handleScreenChange(screen);
  };

  getSharedObject = () => {
    return {
      primaryAppState: this.state,
      handleProfileMenuOpen: this.handleProfileMenuOpen,
      handleMobileMenuOpen: this.handleMobileMenuOpen,
      handleMenuClose: this.handleMenuClose,
      handleMainMenuClose: this.handleMainMenuClose,
      handleDrawerOpen: this.handleDrawerOpen,
      handleDrawerClose: this.handleDrawerClose,
      handleScreenChange: this.handleScreenChange,
      anchorEl: this.state.anchorEl,
      mobileMoreAnchorEl: this.state.mobileMoreAnchorEl
    };
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div
          className={classes.root}
          //style={{ background: theme.palette.secondary.light }}
        >
          <CssBaseline />

          <TopSideDrawer
            app={this.props.app}
            primaryApp={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
          <LeftSideDrawer
            app={this.props.app}
            primaryApp={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
          <Main
            app={this.props.app}
            primaryApp={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
        </div>
        <PhoneScreen
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
        <MasterAdd
          app={this.props.app}
          primaryApp={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      </React.Fragment>
    );
  }
}

PrimaryApp.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PrimaryApp);
