import React, { Component } from "react";
import { Grid } from "@material-ui/core";
// import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TenantsDetails from "./Organizations/TenantsDetails";
// import addTenant from "./Organizations/addTenant";
import deleteTenant from "./Organizations/deleteTenant";
import updateTenant from "./Organizations/updateTenant";
import _ from "lodash";
// import loadMyTenants from "./Organizations/loadTenants";
// import NewTenantDialog from "../dialogs/NewTenantDialog";

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

class Organizations extends Component {
  state = {
    canSave: false,
    canEdit: false,
  };

  componentDidMount(){
    if(this.props.app.user._id == this.props.app.tenant.adminId)
      this.setState({canEdit:true});
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.app.tenant !== this.props.app.tenant){
      if(this.props.app.user._id == this.props.app.tenant.adminId)
        this.setState({canEdit:true});
        else
        this.setState({canEdit:false});
    }
  }
  handleDeleteTenant = index => {
    deleteTenant(index, this);
  };
  handleUpdateTenant = (index, tenant) => {
    updateTenant(index, tenant, this);
  };
  updateTenantData = (data, index, type) => {
    let { tenants } = this.state;
    if (type === "name") tenants[index].name = data;
    if (type === "email") tenants[index].email = data;
    this.setState({ tenants });
  };
  editTenant = () => {
    this.setState({
      canSave: true,
      canEdit: false,
    });
  };
  saveTenant = ()=> {
    // We need to send tenant "Cloned"
    let tenant = _.cloneDeep(this.props.app.tenant);
    tenant = _.pick(tenant,["name","legalName","email","phone","website","mobile"]);
    //delete tenant.confguration;
    console.log(tenant);
    updateTenant(this.props.app.tenant._id,tenant,this);
    this.setState({
      canSave: false,
      canEdit: true,
    });
  }
  deleteTenant = ()=> {
    deleteTenant(this.props.app.tenant,this);
    this.setState({
      canSave: false,
      canEdit: true,
    });
  }

  getSharedObject = () => {
    return {
      updateTenantData: this.updateTenantData,
      handleDeleteTenant: this.handleDeleteTenant,
      handleUpdateTenant: this.handleUpdateTenant,
      editTenant:this.editTenant,
      saveTenant:this.saveTenant,
      deleteTenant:this.deleteTenant,
      sourceState: this.state
    };
  };

  renderTenantDetails = () => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <TenantsDetails
            app={this.props.app}
            primaryApp={this.props.primaryApp}
            source={this.getSharedObject()}
            enqueueSnackbar={this.props.enqueueSnackbar}
          />
        </Grid>
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
