import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormLabel,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
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
    if(adminId === tenant.adminId && !superAdmin) return;
    let userList = _.filter(
      this.props.app.users,
      (user) => user._id === adminId
    );
    if (userList.length > 0) {
      let user = userList[0];
      console.log("User admin", user);
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

    console.log("User none admin", user);
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
  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (tenant == null) return <React.Fragment />;

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
          <Grid container direction="row">
            <Grid item md={4} lg={4}>
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
            <Grid item md={4}></Grid>
            <Grid item md={4}>
              <Grid container direction="row-reverse">
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
