import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyProfileDetails from "./MyProfile/MyProfileDetails";
import updateMe from "../../functions/user/me/updateMe";
import _ from "lodash";
import loadMe from "../../functions/user/me/loadMe";
const styles = theme => ({
  content: {
    flexGrow: 1,
    position: "relative",
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%"
  },
  card: {
    overflow: "auto",
    maxHeight: "100%",
    minHeight: "100%",
    minWidth: "100%"
  },
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {}
});

class MyProfile extends Component {
  state = {
    selectedUser: null,
    canSave: false,
    canEdit: true,
    canWatch: true
  };
  componentDidMount() {
    const { app } = this.props;
    if (!app.user)
      loadMe(this, result => {
        if (!result.error) {
          this.setState({ selectedUser: result.user });
        }
      });
    else this.setState({ selectedUser: app.user });
  }

  saveUser = () => {
    const { app } = this.props;
    let { selectedUser } = this.state;
    let pickUp = [
      "firstname",
      "lastname",
      "username",
      "email",
      "sharedAgent",
      "sipUri",
      "sipServer",
      "sipUserName",
      "sipPassword"
    ];
    //Select password in case it will be updated
    if (selectedUser.password) pickUp.push("password");
    updateMe(_.pick(selectedUser, pickUp), this, result => {
      if (!result.error) {
        app.handleUpdateMe(result.user);
      }
    });
  };
  editUser = () => {
    this.setState({
      canSave: true,
      canRefresh: false,
      canEdit: false,
      canWatch: true
    });
  };
  watchUser = () => {
    this.setState({
      canSave: false,
      canRefresh: true,
      canEdit: true,
      canWatch: true
    });

    //We need to warn about saving
    if (this.state.canSave) this.saveUser();
  };
  updateSelectedUser = user => {
    this.setState({ selectedUser: user });
  };

  getSharedObject = () => {
    return {
      getDetailsWidth: this.getDetailsWidth,
      saveUser: this.saveUser,
      editUser: this.editUser,
      watchUser: this.watchUser,
      updateSelectedUser: this.updateSelectedUser,
      sourceState: this.state
    };
  };

  renderUserDetails = () => {
    if (this.state.selectedUser)
      //&& this.props.app.tenant
      return (
        <MyProfileDetails {...this.props} source={this.getSharedObject()} />
      );
    else return;
  };
  render() {
    return (
      <React.Fragment>
        <Grid container>{this.renderUserDetails()}</Grid>
      </React.Fragment>
    );
  }
}

MyProfile.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MyProfile);
