import React, { Component } from "react";
import {
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  List,
  ListItem,
  ListItemText,
  FormLabel,
  ListItemSecondaryAction,
  Input,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import updateUser from "../../../../functions/tenant/user/updateUser";
import AddTeamMemberDialog from "./AddTeamMemberDialog";
import AssignTenantDialog from "./AssignTenantDialog";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "90%",
  },
  list: {},
  listOrganizations: {},
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "14.7em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

class UserAdvancedManagement extends Component {
  state = {
    selectedTeamMemberId: null,
    selectedUserTenantId: null,
    addTeamMemberDialog: false,
    addUserTenantDialog: false,
  };
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (event.target.name === "mode") selectedUser.mode = event.target.value;
    if (event.target.name === "manager")
      selectedUser.managerId = event.target.value;

    source.updateSelectedUser(selectedUser);
  };
  removeTeamMember = () => {
    updateUser(this.state.selectedTeamMemberId, { managerId: null }, this);
    this.setState({ selectedTeamMemberId: null });
  };
  removeUserTenant = () => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (!selectedUser.tenantIds) return;

    const tenantIds = _.filter(
      selectedUser.tenantIds,
      (tenantId) => tenantId !== this.state.selectedUserTenantId
    );
    selectedUser.tenantIds = tenantIds;
    source.updateSelectedUser(selectedUser);
    this.setState({ selectedUserTenantId: null });
  };
  addUserTenant = (tenantId) => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (!selectedUser.tenantIds) selectedUser.tenantIds = [];
    selectedUser.tenantIds.push(tenantId);
    source.updateSelectedUser(selectedUser);
    this.setState({ selectedUserTenantId: tenantId });
  };
  handleAddTenantDialogClose = () => {
    this.setState({ addUserTenantDialog: false });
  };
  handleAddTenantDialogOpen = () => {
    this.setState({ addUserTenantDialog: true });
  };

  addTeamMember = (userId) => {
    const { selectedUser } = this.props.source.sourceState;
    updateUser(userId, { managerId: selectedUser._id }, this, (result) => {
      if (!result.error) this.setState({ selectedTeamMemberId: userId });
    });
  };
  handleAddMemberDialogClose = () => {
    this.setState({ addTeamMemberDialog: false });
  };
  handleAddMemberDialogOpen = () => {
    this.setState({ addTeamMemberDialog: true });
  };

  renderTeamMember = (user) => {
    const { source, theme } = this.props;
    const { selectedUser } = this.props.source.sourceState;

    if (user.managerId === selectedUser._id) {
      return (
        <ListItem
          disabled
          selected={user._id === this.state.selectedTeamMemberId}
          style={{ padding: "2%" }}
          key={user._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ selectedTeamMemberId: user._id });
          }}
          style={{ padding: theme.spacing(1) * 0.2 }}
        >
          <ListItemText
            primary={`${user.firstname} ${user.lastname}`}
            primaryTypographyProps={{ variant: "caption" }}
            style={{ padding: theme.spacing(0) }}
          />
          {user._id === this.state.selectedTeamMemberId ? (
            <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
              <Button
                disabled
                variant="text"
                size="small"
                color="primary"
                onClick={this.removeTeamMember}
                style={{ textTransform: "none" }}
              >
                <Typography variant="caption">Remove</Typography>
              </Button>
            </ListItemSecondaryAction>
          ) : (
            ""
          )}
        </ListItem>
      );
    }
    return;
  };
  renderUserTenant = (tenant) => {
    const { source, theme } = this.props;
    const { selectedUser } = source.sourceState;

    //We need to ensure that organization is part of user tenantIds
    if (!selectedUser.tenantIds) return "";
    const result = _.filter(
      selectedUser.tenantIds,
      (tenantId) => tenantId === tenant._id
    );
    if (result && result.length > 0)
      return (
        <ListItem
          disabled
          selected={tenant._id === this.state.selectedUserTenantId}
          style={{ padding: "2%" }}
          key={tenant._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ selectedUserTenantId: tenant._id });
          }}
          style={{ padding: theme.spacing(1) * 0.2 }}
        >
          <ListItemText
            primary={tenant.name}
            primaryTypographyProps={{ variant: "caption" }}
            style={{ padding: theme.spacing(0) }}
          />
          {tenant._id === this.state.selectedUserTenantId ? (
            <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
              <Button
                disabled
                variant="text"
                size="small"
                color="primary"
                onClick={this.removeUserTenant}
                style={{ textTransform: "none" }}
              >
                <Typography variant="caption">Remove</Typography>
              </Button>
            </ListItemSecondaryAction>
          ) : (
            ""
          )}
        </ListItem>
      );
    else return "";
  };
  render() {
    const { classes, source, app } = this.props;
    const { users, tenants } = app;
    return (
      <React.Fragment>
        {/* Group of controls (Mode , Manager , Organization , Add Organization*/}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column">
            {/* User Mode */}
            <FormControl
              //variant="outlined"
              className={classes.formControl}
              style={{ minWidth: "50%" }}
              size="small"
            >
              <InputLabel htmlFor="user-mode-label">
                <Typography variant="caption">Mode</Typography>
              </InputLabel>
              <Select
                value={
                  source.sourceState.selectedUser.mode
                    ? source.sourceState.selectedUser.mode
                    : "Push"
                }
                onChange={this.onDataChange}
                disabled
                input={<Input name="mode" id="user-mode-label" />}
              >
                <MenuItem value="Push">
                  <Typography variant="caption">Push</Typography>
                </MenuItem>
                <MenuItem value="Pull">
                  <Typography variant="caption">Pull</Typography>
                </MenuItem>
                <MenuItem value="Mix">
                  <Typography variant="caption">Mix</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            {/* User Manager */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="manager-label">
                <Typography variant="caption">Manager</Typography>
              </InputLabel>
              <Select
                value={
                  source.sourceState.selectedUser.managerId
                    ? source.sourceState.selectedUser.managerId
                    : ""
                }
                disabled
                onChange={this.onDataChange}
                input={
                  <OutlinedInput
                    labelWidth={80}
                    name="manager"
                    id="manager-label"
                  />
                }
              >
                <MenuItem key="Empty-Manager" value="">
                  {""}
                </MenuItem>
                {this.props.app.users
                  ? this.props.app.users.map((user) => {
                      if (user.role !== "Agent" && user.role !== "User")
                        // You are signed in as agent
                        return (
                          <MenuItem key={user._id} value={user._id}>
                            <Typography variant="caption">{`${user.firstname} ${user.lastname}`}</Typography>
                          </MenuItem>
                        );

                      return "";
                    })
                  : ""}
              </Select>
            </FormControl>
            {/* User Organizations */}
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Organizations</Typography>
              </FormLabel>
              <List
                disabled
                className={classes.listOrganizations}
                disablePadding
              >
                {tenants
                  ? tenants.map((tenant) => {
                      return this.renderUserTenant(tenant);
                    })
                  : ""}
              </List>
            </FormControl>
            {/* Add organization button */}
            <FormControl className={classes.formControl} size="small">
              <Button
                disabled
                variant="contained"
                style={{ width: "100%" }}
                color="secondary"
                onClick={this.handleAddTenantDialogOpen}
                style={{ textTransform: "none" }}
              >
                <Typography variant="caption">Add organization</Typography>
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        {/* Group of controls (Team members , Add User)*/}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column">
            {/* Team members */}
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Team members</Typography>
              </FormLabel>
              <List disabled className={classes.listUsers} disablePadding>
                {users
                  ? users.map((user) => {
                      return this.renderTeamMember(user);
                    })
                  : ""}
              </List>
            </FormControl>
            {/* Add user button */}
            <FormControl className={classes.formControl} size="small">
              <Button
                variant="contained"
                color="secondary"
                style={{ width: "100%" }}
                disabled
                onClick={this.handleAddMemberDialogOpen}
                style={{ textTransform: "none" }}
              >
                <Typography variant="caption">Add member</Typography>
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <AddTeamMemberDialog
          {...this.props}
          dialogTrigger={this.state.addTeamMemberDialog}
          addTeamMember={this.addTeamMember}
          handleAddMemberDialogClose={this.handleAddMemberDialogClose}
        />
        <AssignTenantDialog
          {...this.props}
          dialogTrigger={this.state.addUserTenantDialog}
          addUserTenant={this.addUserTenant}
          handleAddTenantDialogClose={this.handleAddTenantDialogClose}
        />
      </React.Fragment>
    );
  }
}

UserAdvancedManagement.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserAdvancedManagement);
