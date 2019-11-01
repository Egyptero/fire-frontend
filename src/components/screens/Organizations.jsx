import React, { Component } from "react";
import { Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TenantsDetails from "./Organizations/TenantsDetails";
import addTenant from "./Organizations/addTenant";
import deleteTenant from "./Organizations/deleteTenant";
import updateTenant from "./Organizations/updateTenant";
import loadMyTenants from "./Organizations/loadTenants";
import NewTenantDialog from "../dialogs/NewTenantDialog";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class Organizations extends Component {
  state = {
    tenants: [],
    openNewTenant: false
  };

  componentDidMount() {
    this.loadTenants();
  }

  handleNewTenantClickOpen = () => {
    this.setState({ openNewTenant: true });
  };

  handleNewTenantClose = () => {
    this.setState({ openNewTenant: false });
  };

  loadTenants = () => {
    loadMyTenants(this);
  };
  handleDeleteTenant = index => {
    deleteTenant(index, this);
  };
  handleUpdateTenant = (index, tenant) => {
    updateTenant(index, tenant, this);
  };
  handleAddTenant = tenant => {
    addTenant(tenant, this);
  };
  updateTenantData = (data, index, type) => {
    let { tenants } = this.state;
    if (type === "name") tenants[index].name = data;
    if (type === "email") tenants[index].email = data;
    this.setState({ tenants });
  };
  getSharedObject = () => {
    return {
      updateTenantData: this.updateTenantData,
      handleNewTenantClose: this.handleNewTenantClose,
      handleDeleteTenant: this.handleDeleteTenant,
      handleUpdateTenant: this.handleUpdateTenant,
      loadTenants: this.loadTenants,
      handleAddTenant: this.handleAddTenant,
      sourceState: this.state
    };
  };

  renderTenantDetails = () => {
    return (
      <React.Fragment>
        <Grid item dir="rtl" xs={12}>
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleNewTenantClickOpen}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <TenantsDetails
            app={this.props.app}
            primaryApp={this.props.primaryApp}
            source={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
        </Grid>
        <NewTenantDialog
          app={this.props.app}
          primaryApp={this.props.primaryApp}
          source={this.getSharedObject()}
          enqueueSnackbar={this.props.enqueueSnackbar}
        />
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.root} container spacing={1}>
          {this.renderTenantDetails()}
        </Grid>
      </React.Fragment>
    );
  }
}

Organizations.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Organizations);
