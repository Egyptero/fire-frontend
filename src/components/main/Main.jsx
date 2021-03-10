import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dashboard from "../screens/Dashboard";
//import Setting from "../screens/Setting";
import Queues from "../screens/Queues";
import Information from "../screens/Information";
import History from "../screens/History";
//import Logs from "../screens/Logs";
import Organizations from "../screens/Organizations";
import Skillgroups from "../screens/Skillgroups";
import Users from "../screens/Users";
import Customers from "../screens/Customers";
import Workflows from "../screens/Workflows";
import Types from "../screens/Types";
import Todos from "../screens/Todos";
import Interactions from "../screens/Interactions";
import MyInteractions from "../screens/MyInteractions";
import MyProfile from "../screens/MyProfile";
import TenantWizard from "../screens/TenantWizard";
import Welcome from "../screens/Welcome";
//import Reports from "../screens/Reports";

const styles = theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    // background: theme.palette.primary.light,
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: "100%",
    height: "100%",
    maxHeight: "100%"
  }
});

class Main extends Component {
  getScreen = () => {
    const { screen } = this.props.app;
    if (screen === "Interactions")
      return (
        <Interactions
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Dashboard")
      return (
        <Dashboard
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Queues")
      return (
        <Queues
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Information")
      return (
        <Information
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Types")
      return (
        <Types
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Workflows")
      return (
        <Workflows
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Skillgroups")
      return (
        <Skillgroups
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Organizations")
      return (
        <Organizations
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Users")
      return (
        <Users
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Contacts")
      return (
        <Customers
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
/* Disable logs in MVP
      else if (screen === "Logs")
      return (
        <Logs
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
*/
/* Setting is disabled in MVP      
    else if (screen === "Setting")
      return (
        <Setting
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
*/
    else if (screen === "History")
      return (
        <History
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "To do")
      return (
        <Todos
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "My work")
      return (
        <MyInteractions
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Profile")
      return (
        <MyProfile
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Organization Wizard")
      return (
        <TenantWizard
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
    else if (screen === "Welcome")
      return (
        <Welcome
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
/** Reports are disabled in MVP
    else if (screen === "Reports")
      return (
        <Reports
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      );
*/
  };
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.getScreen()}
        </main>
      </React.Fragment>
    );
  }
}

Main.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Main);
