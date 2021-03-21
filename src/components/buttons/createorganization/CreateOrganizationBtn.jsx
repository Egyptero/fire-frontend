import React, { Component } from "react";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "../../primaryapp/appStyles";
import { withStyles } from "@material-ui/core/styles";

class CreateOrganizationBtn extends Component {
  state = {};

  handleAddTenant = tenant => {
    console.log("Handle Add Tenant");
  };
  handleNewTenantClickOpen = event => {
    event.preventDefault();
    const { app } = this.props;
    app.handleScreenChange("Organization Wizard");
  };
  render() {
    return (
      <React.Fragment>
        <Button
          variant="outlined"
          color="inherit"
          onClick={this.handleNewTenantClickOpen}
          style={{ textTransform: "none" }}
          size="small"
        >
          New Organization
        </Button>
      </React.Fragment>
    );
  }
}

CreateOrganizationBtn.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
  //theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CreateOrganizationBtn);
