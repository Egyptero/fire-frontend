import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NewUserDialog from "../dialogs/NewUserDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadUsers from "../../functions/tenant/user/loadUsers";
import addUser from "../../functions/tenant/user/addUser";
import UsersList from "./Users/UsersList";
import UserDetails from "./Users/UserDetails";
import updateUser from "../../functions/tenant/user/updateUser";
import _ from "lodash";
import deleteUser from "../../functions/tenant/user/deleteUser";
import loadUser from "../../functions/tenant/user/loadUser";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    position: "relative",
    height: "90vh",
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});

class Users extends Component {
  state = {
    openNewUser: false,
    width: 3,
    selectedUser: null,
    canSave: false,
    canEdit: true,
    canWatch: true,
  };
  componentDidMount() {
    const { app } = this.props;
    // if (app.tenant && !app.users)
    //   loadUsers(this, result => {
    //     if (!result.error && result.users && result.users.length > 0)
    //       this.setState({ selectedUser: result.users[0] });
    //     else this.setState({ selectedUser: null });
    //   });
    if (!this.state.selectedUser && app.users && app.users.length > 0)
      this.setState({ selectedUser: app.users[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (app.tenant._id !== prevApp.tenant._id)
      loadUsers(this, (result) => {
        if (!result.error && result.users && result.users.length > 0)
          this.setState({ selectedUser: result.users[0] });
        else this.setState({ selectedUser: null });
      });
  }
  getListWidth = () => {
    return this.state.width;
  };
  getDetailsWidth = () => {
    return 12 - this.state.width;
  };
  switchDetailsView = () => {
    const { width } = this.state;
    if (width === 3) this.setState({ width: 0 });
    else this.setState({ width: 3 });
  };
  //Used during user updates at run time
  updateSelectedUser = (user) => {
    this.setState({ selectedUser: user });
  };
  reloadUsers = () => {
    loadUsers(this);
  };
  saveUser = () => {
    let { selectedUser } = this.state;
    let pickUp = [
      "firstname",
      "lastname",
      "username",
      "email",
      "role",
      "tenantIds",
      "skillIds",
      "mode",
      "managerId",
      "sharedAgent",
      "odi",
      "phone",
      "sipUri",
      "sipServer",
      "sipUserName",
      "sipPassword",
      "notifications",
      "autoAccept",
      "wrapup",
      "workbin",
      "autoLogin",
      "interactionCapacity",
      "caseCapacity",
      "offerTimeout",
      "wrapupTimeout",
      "dailyInteractionTarget",
      "dailyCaseTarget",
      "dailyUtilizationTarget",
      "offlineASATarget",
      "onlineASATarget",
      "overrideUserConf",
      "overrideKPIsConf",
    ];
    //Select password in case it will be updated
    if (selectedUser.password) pickUp.push("password");
    updateUser(selectedUser._id, _.pick(selectedUser, pickUp), this);
  };
  editUser = () => {
    this.setState({
      canSave: true,
      canRefresh: false,
      canEdit: false,
      canWatch: true,
    });
  };
  watchUser = () => {
    this.setState({
      canSave: false,
      canRefresh: true,
      canEdit: true,
      canWatch: true,
    });

    //We need to warn about saving
    if (this.state.canSave) this.saveUser();
  };
  deleteUser = () => {
    let { selectedUser } = this.state;
    deleteUser(selectedUser._id, this, (result) => {
      if (!result.error) this.setState({ selectedUser: null });
    });
  };
  handleListItemClick = (event, index) => {
    if (this.state.selectedUser && this.state.canSave)
      loadUser(this.state.selectedUser._id, this);

    const selectedUser = JSON.parse(
      JSON.stringify(this.props.app.users[index])
    );
    this.setState({
      selectedUser,
      canSave: false,
      canRefresh: true,
      canEdit: true,
      canWatch: true,
    });
  };
  handleNewUserClickOpen = () => {
    this.setState({ openNewUser: true });
  };
  handleNewUserClose = () => {
    this.setState({ openNewUser: false });
  };
  handleAddUser = (user) => {
    addUser(user, this, (result) => {
      if (!result.error) {
        this.handleNewUserClose();
        this.setState({ selectedUser: result.user });
      }
    });
  };

  getSharedObject = () => {
    return {
      getListWidth: this.getListWidth,
      getDetailsWidth: this.getDetailsWidth,
      switchDetailsView: this.switchDetailsView,
      handleNewUserClickOpen: this.handleNewUserClickOpen,
      handleNewUserClose: this.handleNewUserClose,
      handleAddUser: this.handleAddUser,
      reloadUsers: this.reloadUsers,
      handleListItemClick: this.handleListItemClick,
      saveUser: this.saveUser,
      editUser: this.editUser,
      watchUser: this.watchUser,
      deleteUser: this.deleteUser,
      updateSelectedUser: this.updateSelectedUser,
      sourceState: this.state,
    };
  };

  renderUsersList = () => {
    return <UsersList {...this.props} source={this.getSharedObject()} />;
  };
  renderUserDetails = () => {
    if (this.state.selectedUser && this.props.app.tenant)
      return <UserDetails {...this.props} source={this.getSharedObject()} />;
    else return;
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {this.renderUsersList()}
          {this.renderUserDetails()}
        </Grid>
        <NewUserDialog source={this.getSharedObject()} admin {...this.props} />
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Users);
