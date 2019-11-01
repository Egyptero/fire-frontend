import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";
import _ from "lodash";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    minHeight: "4em",
    minWidth: "16rem"
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh"
  },
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%"
  },
  list: {},
  listOrganizations: {},
  listUsers: {}
});

class AssignTenantDialog extends Component {
  state = {
    selectedTenantId: "",
    error: ""
  };
  componentDidUpdate(prevProps, prevState) {
    const { dialogTrigger } = this.props;
    if (dialogTrigger !== prevProps.dialogTrigger)
      this.setState({ selectedTenantId: "", error: "" });
  }
  assignUserTenant = () => {
    const { addUserTenant, handleAddTenantDialogClose } = this.props;
    if (this.state.error === "" && this.state.selectedTenantId) {
      addUserTenant(this.state.selectedTenantId);
      handleAddTenantDialogClose();
    }
  };
  onChange = event => {
    this.setState({ selectedTenantId: event.target.value });
  };
  renderTenant = tenant => {
    const { selectedUser } = this.props.source.sourceState;
    if (selectedUser.tenantIds) {
      const tenantIds = _.filter(
        selectedUser.tenantIds,
        tenantId => tenantId === tenant._id
      );
      if (tenantIds && tenantIds.length > 0)
        // already exist
        return;
    }
    return (
      <MenuItem value={tenant._id} key={tenant._id}>{`${
        tenant.name
      }`}</MenuItem>
    );
  };

  render() {
    const {
      dialogTrigger,
      handleAddTenantDialogClose,
      classes,
      app
    } = this.props;
    const { tenants } = app;
    return (
      <Dialog
        open={dialogTrigger}
        onClose={handleAddTenantDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Assign organization</DialogTitle>
        <DialogContent>
          <Grid container direction="column" className={classes.grid}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="tenant-label">
                Select organization
              </InputLabel>
              <Select
                value={this.state.selectedTenantId}
                onChange={this.onChange}
                input={
                  <OutlinedInput
                    labelWidth={140}
                    name="tenant"
                    id="tenant-label"
                  />
                }
              >
                {tenants
                  ? tenants.map(tenant => {
                      return this.renderTenant(tenant);
                    })
                  : ""}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTenantDialogClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.assignUserTenant}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AssignTenantDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  handleAddTenantDialogClose: PropTypes.func.isRequired,
  addUserTenant: PropTypes.func.isRequired,
  dialogTrigger: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(AssignTenantDialog);
