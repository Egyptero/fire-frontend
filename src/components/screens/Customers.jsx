import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import NewCustomerDialog from "../dialogs/NewCustomerDialog";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loadCustomers from "../../functions/tenant/customer/loadCustomers";
import _ from "lodash";
import CustomersList from "./Customers/CustomersList";
import CustomerDetails from "./Customers/CustomerDetails";
import updateCustomer from "../../functions/tenant/customer/updateCustomer";
import deleteCustomer from "../../functions/tenant/customer/deleteCustomer";
import loadCustomer from "../../functions/tenant/customer/loadCustomer";
import addCustomer from "../../functions/tenant/customer/addCustomer";
const styles = theme => ({
  content: {
    flexGrow: 1,
    position: "relative",
    height: "90vh"
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

class Customers extends Component {
  state = {
    openNewCustomer: false,
    width: 3,
    selectedCustomer: null,
    canSave: false,
    canEdit: true,
    canWatch: true
  };
  componentDidMount() {
    const { app } = this.props;
    if (app.tenant && !app.customers)
      loadCustomers(this, result => {
        if (!result.error && result.customers && result.customers.length > 0)
          this.setState({ selectedCustomer: result.customers[0] });
        else this.setState({ selectedCustomer: null });
      });
    if (
      !this.state.selectedCustomer &&
      app.customers &&
      app.customers.length > 0
    )
      this.setState({ selectedCustomer: app.customers[0] });
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    const { app: prevApp } = prevProps;
    if (app.tenant._id !== prevApp.tenant._id)
      loadCustomers(this, result => {
        if (!result.error && result.customers && result.customers.length > 0)
          this.setState({ selectedCustomer: result.customers[0] });
        else this.setState({ selectedCustomer: null });
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
  updateSelectedCustomer = customer => {
    this.setState({ selectedCustomer: customer });
  };
  reloadCustomers = () => {
    loadCustomers(this);
  };
  saveCustomer = () => {
    let { selectedCustomer } = this.state;
    let pickUp = [
      "firstname",
      "lastname",
      "email",
      "username",
      "title",
      "profession",
      "phone",
      "ids",
      "emails",
      "phones"
    ];
    updateCustomer(
      selectedCustomer._id,
      _.pick(selectedCustomer, pickUp),
      this
    );
  };
  editCustomer = () => {
    this.setState({
      canSave: true,
      canEdit: false,
      canWatch: true
    });
  };
  watchCustomer = () => {
    this.setState({
      canSave: false,
      canEdit: true,
      canWatch: true
    });

    //We need to warn about saving
    if (this.state.canSave) this.saveCustomer();
  };
  deleteCustomer = () => {
    let { selectedCustomer } = this.state;
    deleteCustomer(selectedCustomer._id, this, result => {
      if (!result.error) this.setState({ selectedCustomer: null });
    });
  };
  handleListItemClick = (event, index) => {
    if (this.state.selectedCustomer && this.state.canSave)
      loadCustomer(this.state.selectedCustomer._id, this);

    const selectedCustomer = JSON.parse(
      JSON.stringify(this.props.app.customers[index])
    );
    this.setState({
      selectedCustomer,
      canSave: false,
      canEdit: true,
      canWatch: true
    });
  };
  handleNewCustomerClickOpen = () => {
    this.setState({ openNewCustomer: true });
  };
  handleNewCustomerClose = () => {
    this.setState({ openNewCustomer: false });
  };
  handleAddCustomer = customer => {
    addCustomer(customer, this, result => {
      if (!result.error) {
        this.handleNewCustomerClose();
        this.setState({ selectedCustomer: result.customer });
      }
    });
  };
  getSharedObject = () => {
    return {
      getListWidth: this.getListWidth,
      getDetailsWidth: this.getDetailsWidth,
      switchDetailsView: this.switchDetailsView,
      handleNewCustomerClickOpen: this.handleNewCustomerClickOpen,
      handleNewCustomerClose: this.handleNewCustomerClose,
      handleAddCustomer: this.handleAddCustomer,
      reloadCustomers: this.reloadCustomers,
      handleListItemClick: this.handleListItemClick,
      saveCustomer: this.saveCustomer,
      editCustomer: this.editCustomer,
      watchCustomer: this.watchCustomer,
      deleteCustomer: this.deleteCustomer,
      updateSelectedCustomer: this.updateSelectedCustomer,
      sourceState: this.state
    };
  };
  renderCustomersList = () => {
    return <CustomersList {...this.props} source={this.getSharedObject()} />;
  };
  renderCustomerDetails = () => {
    if (this.state.selectedCustomer && this.props.app.tenant)
      return (
        <CustomerDetails {...this.props} source={this.getSharedObject()} />
      );
    else return;
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.content} container spacing={1}>
          {this.renderCustomersList()}
          {this.renderCustomerDetails()}
        </Grid>
        <NewCustomerDialog {...this.props} source={this.getSharedObject()} />
      </React.Fragment>
    );
  }
}

Customers.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};
export default withStyles(styles, { withTheme: true })(Customers);
