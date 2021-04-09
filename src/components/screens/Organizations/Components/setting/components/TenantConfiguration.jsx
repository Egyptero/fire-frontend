import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close, ExpandMore } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import _ from "lodash";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {},
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class TenantConfiguration extends Component {
  state = {
    adminId: null,
    selectedNotReadyReasonIndex: -1,
    selectedLogoutReasonIndex: -1,
    selectedWrapupReasonIndex: -1,
    notReadyReason: "",
    logoutReason: "",
    wrapupReason: "",
  };
  addTenantAdmin = (event) => {
    let { tenant } = this.props.source.sourceState;
    event.preventDefault();
    tenant.adminIds.push(this.state.adminId);
    this.props.source.updateTenantOnChange(tenant);
  };
  removeTenantAdmin = (event) => {
    let { tenant } = this.props.source.sourceState;
    event.preventDefault();
    tenant.adminIds = tenant.adminIds.filter(
      (adminId) => adminId !== this.state.adminId
    );
    this.props.source.updateTenantOnChange(tenant);
  };
  setTenantSuperAdmin = (event) => {
    let { tenant } = this.props.source.sourceState;
    event.preventDefault();
    tenant.adminId = this.state.adminId;
    this.props.source.updateTenantOnChange(tenant);
  };
  loadAdministrators = (adminId, superAdmin) => {
    const { source, theme } = this.props;
    const { tenant } = this.props.source.sourceState;
    if (!tenant) return;
    if (adminId === tenant.adminId && !superAdmin) return;
    let userList = _.filter(
      this.props.app.users,
      (user) => user._id === adminId
    );
    if (userList.length > 0) {
      let user = userList[0];
      //console.log("User admin", user);
      return (
        <ListItem
          disabled={!source.sourceState.canSave}
          selected={user._id === this.state.adminId}
          style={{ padding: "2%" }}
          key={user._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ adminId: user._id });
          }}
          style={{ padding: theme.spacing(1) * 0.2 }}
        >
          <ListItemText
            primary={`${user.firstname} ${user.lastname}`}
            primaryTypographyProps={{ variant: "caption" }}
            style={{ padding: theme.spacing(0) }}
          />
          {user._id === this.state.adminId && !superAdmin ? (
            <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
              <Button
                disabled={!source.sourceState.canSave}
                variant="text"
                size="small"
                color="primary"
                onClick={this.removeTenantAdmin}
                style={{ textTransform: "none" }}
              >
                <Typography variant="caption">Remove</Typography>
              </Button>
              {tenant.adminId === this.props.app.user._id ? (
                <Button
                  disabled={!source.sourceState.canSave}
                  variant="text"
                  size="small"
                  color="primary"
                  onClick={this.setTenantSuperAdmin}
                  style={{ textTransform: "none" }}
                >
                  <Typography variant="caption">Make super</Typography>
                </Button>
              ) : (
                ""
              )}
            </ListItemSecondaryAction>
          ) : (
            ""
          )}
        </ListItem>
      );
    }
  };
  loadNoneAdministrators = (user) => {
    const { source, theme } = this.props;
    const { tenant } = this.props.source.sourceState;
    if (!tenant) return;
    //Verify if user is tenant admin
    let idsList = _.filter(tenant.adminIds, (adminId) => user._id === adminId);
    if (idsList.length > 0) return;
    if (user._id === tenant.adminId) return;

    //console.log("User none admin", user);
    return (
      <ListItem
        disabled={!source.sourceState.canSave}
        selected={user._id === this.state.adminId}
        style={{ padding: "2%" }}
        key={user._id}
        onClick={() => {
          if (source.sourceState.canSave) this.setState({ adminId: user._id });
        }}
        style={{ padding: theme.spacing(1) * 0.2 }}
      >
        <ListItemText
          primary={`${user.firstname} ${user.lastname}`}
          primaryTypographyProps={{ variant: "caption" }}
          style={{ padding: theme.spacing(0) }}
        />
        {user._id === this.state.adminId ? (
          <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
            <Button
              disabled={!source.sourceState.canSave}
              variant="text"
              size="small"
              color="primary"
              onClick={this.addTenantAdmin}
              style={{ textTransform: "none" }}
            >
              <Typography variant="caption">Assign</Typography>
            </Button>
          </ListItemSecondaryAction>
        ) : (
          ""
        )}
      </ListItem>
    );
  };
  onReasonChange = (event, type) => {
    switch (type) {
      case "Not ready":
        this.setState({ notReadyReason: event.target.value });
        break;
      case "Logout":
        this.setState({ logoutReason: event.target.value });
        break;
      case "Wrapup":
        this.setState({ wrapupReason: event.target.value });
        break;
    }
  };
  addReason = (type) => {
    let { tenant } = this.props.source.sourceState;
    switch (type) {
      case "Not ready":
        if (!tenant.notReadyReasons) tenant.notReadyReasons = [];
        tenant.notReadyReasons.push(this.state.notReadyReason);
        this.setState({ notReadyReason: "" });
        break;
      case "Logout":
        if (!tenant.logoutReasons) tenant.logoutReasons = [];
        tenant.logoutReasons.push(this.state.logoutReason);
        this.setState({ logoutReason: "" });
        break;
      case "Wrapup":
        if (!tenant.wrapupReasons) tenant.wrapupReasons = [];
        tenant.wrapupReasons.push(this.state.wrapupReason);
        this.setState({ wrapupReason: "" });
        break;
    }

    this.props.source.updateTenantOnChange(tenant);
  };
  removeReason = (type) => {
    let { tenant } = this.props.source.sourceState;
    switch (type) {
      case "Not ready":
        if (!tenant.notReadyReasons) return;
        tenant.notReadyReasons.splice(this.state.selectedNotReadyReasonIndex,1);
        break;
      case "Logout":
        if (!tenant.logoutReasons) return;
        tenant.logoutReasons.splice(this.state.selectedLogoutReasonIndex,1);
        break;
      case "Wrapup":
        if (!tenant.wrapupReasons) return;
        tenant.wrapupReasons.splice(this.state.selectedWrapupReasonIndex,1);
        break;
    }

    this.props.source.updateTenantOnChange(tenant);
  };
  renderReason = (reason, index, type) => {
    const { source, theme } = this.props;
    const { tenant } = this.props.source.sourceState;
    if (!tenant) return;
    let value = -1;
    switch (type) {
      case "Not ready":
        value = this.state.selectedNotReadyReasonIndex;
        break;
      case "Logout":
        value = this.state.selectedLogoutReasonIndex;
        break;
      case "Wrapup":
        value = this.state.selectedWrapupReasonIndex;
        break;
    }
    return (
      <ListItem
        disabled={!source.sourceState.canSave}
        selected={index === value}
        style={{ padding: "2%" }}
        key={index}
        onClick={() => {
          if (source.sourceState.canSave) {
            if (type === "Not ready")
              this.setState({ selectedNotReadyReasonIndex: index });
            if (type === "Logout")
              this.setState({ selectedLogoutReasonIndex: index });
            if (type === "Wrapup")
              this.setState({ selectedWrapupReasonIndex: index });
          }
        }}
        // style={{ padding: theme.spacing(1) * 0.2 }}
      >
        <ListItemText
          primary={`${reason}`}
          primaryTypographyProps={{ variant: "caption" }}
          style={{ padding: theme.spacing(0) }}
        />
        {index === value ? (
          <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
            <Button
              disabled={!source.sourceState.canSave}
              variant="text"
              size="small"
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                this.removeReason(type);
              }}
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
  };
  renderAddReasonField = (type) => {
    const { source, theme } = this.props;
    const { tenant } = this.props.source.sourceState;
    if (!tenant) return;

    return (
      <ListItem
        disabled={!source.sourceState.canSave}
        style={{ padding: "2%" }}
        key={type}
      >
        <TextField
          disabled={!source.sourceState.canSave}
          value={
            type === "Not ready"
              ? this.state.notReadyReason
              : type === "Wrapup"
              ? this.state.wrapupReason
              : type === "Logout"
              ? this.state.logoutReason
              : ""
          }
          //name="reason"
          onChange={(event) => {
            event.preventDefault();
            this.onReasonChange(event, type);
          }}
          style={{
            width: "80%",
            padding: "0",
          }}
          inputProps={{ style: { fontSize: "0.8rem" } }}
          InputLabelProps={{ style: { fontSize: "0.8rem" } }}
        />

        <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
          <Button
            disabled={!source.sourceState.canSave}
            variant="text"
            size="small"
            color="primary"
            onClick={(event) => {
              event.preventDefault();
              this.addReason(type);
            }}
            style={{ textTransform: "none" }}
          >
            <Typography variant="caption">Add</Typography>
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };
  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (!tenant) return <React.Fragment />;

    return (
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ boxShadow: "none`" }}
        >
          <Typography variant="caption">
            <b>Tenant configuration</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid item container direction="row">
              {/* Manage Administrators */}
              <Grid item md={3}>
                <Grid container direction="column">
                  <FormControl className={classes.formControl} size="small">
                    <FormLabel disabled={!source.sourceState.canSave}>
                      <Typography variant="caption">Administrators</Typography>
                    </FormLabel>
                    <List
                      disabled={!source.sourceState.canSave}
                      className={classes.list}
                      disablePadding
                    >
                      {this.loadAdministrators(tenant.adminId, true)}

                      {tenant.adminIds
                        ? tenant.adminIds.map((adminId) => {
                            return this.loadAdministrators(adminId);
                          })
                        : ""}
                      {this.props.app.users
                        ? this.props.app.users.map((user) => {
                            return this.loadNoneAdministrators(user);
                          })
                        : ""}
                    </List>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Manage Not ready reason codes */}
              <Grid item md={3}>
                <Grid container direction="column">
                  <FormControl className={classes.formControl} size="small">
                    <FormLabel disabled={!source.sourceState.canSave}>
                      <Typography variant="caption">
                        Not-ready reasons
                      </Typography>
                    </FormLabel>
                    <List
                      disabled={!source.sourceState.canSave}
                      className={classes.list}
                      disablePadding
                    >
                      {this.renderAddReasonField("Not ready")}
                      {tenant.notReadyReasons
                        ? tenant.notReadyReasons.map((reason, index) => {
                            return this.renderReason(
                              reason,
                              index,
                              "Not ready"
                            );
                          })
                        : ""}
                      {/* {this.renderReason("Prayer")}
                      {this.renderReason("Meeting")}
                      {this.renderReason("Cofee")} */}
                    </List>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Manage Logout reason codes */}
              <Grid item md={3}>
                <Grid container direction="column">
                  <FormControl className={classes.formControl} size="small">
                    <FormLabel disabled={!source.sourceState.canSave}>
                      <Typography variant="caption">Logout reasons</Typography>
                    </FormLabel>
                    <List
                      disabled={!source.sourceState.canSave}
                      className={classes.list}
                      disablePadding
                    >
                      {this.renderAddReasonField("Logout")}
                      {tenant.logoutReasons
                        ? tenant.logoutReasons.map((reason, index) => {
                            return this.renderReason(reason, index, "Logout");
                          })
                        : ""}

                      {/* {this.renderReason("End of shift")}
                      {this.renderReason("Meeting")} */}
                    </List>
                  </FormControl>
                </Grid>
              </Grid>
              {/* Manage wrapup reason codes */}
              <Grid item md={3}>
                <Grid container direction="column">
                  <FormControl className={classes.formControl} size="small">
                    <FormLabel disabled={!source.sourceState.canSave}>
                      <Typography variant="caption">Wrapup reasons</Typography>
                    </FormLabel>
                    <List
                      disabled={!source.sourceState.canSave}
                      className={classes.list}
                      disablePadding
                    >
                      {this.renderAddReasonField("Wrapup")}
                      {tenant.wrapupReasons
                        ? tenant.wrapupReasons.map((reason, index) => {
                            return this.renderReason(reason, index, "Wrapup");
                          })
                        : ""}

                      {/* {this.renderReason("Order placed")}
                      {this.renderReason("Complaint raised")} */}
                    </List>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ margin: theme.spacing(2) }} />
            <Grid item container>
              {/* Delete organization button */}
              <Grid container justify="center">
                {/* Delete Organization */}
                <FormControl className={classes.formControl} size="small">
                  <Button
                    variant="outlined"
                    color="primary"
                    type="Delete organization"
                    disabled={!source.sourceState.canSave}
                    onClick={source.deleteTenant}
                    style={{ textTransform: "none" }}
                  >
                    <Typography variant="caption">
                      Delete organization
                    </Typography>
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

TenantConfiguration.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TenantConfiguration);
