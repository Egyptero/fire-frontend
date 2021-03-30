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
  MenuItem,
  Typography,
} from "@material-ui/core";
import _ from "lodash";
import { Cancel, Save } from "@material-ui/icons";
const styles = (theme) => ({
  content: {},
  grid: {
    minHeight: "4em",
    minWidth: "16rem",
  },
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class AssignTenantDialog extends Component {
  state = {
    selectedTenantId: "",
    error: "",
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
  onChange = (event) => {
    this.setState({ selectedTenantId: event.target.value });
  };
  renderTenant = (tenant) => {
    const { selectedUser } = this.props.source.sourceState;
    if (selectedUser.tenantIds) {
      const tenantIds = _.filter(
        selectedUser.tenantIds,
        (tenantId) => tenantId === tenant._id
      );
      if (tenantIds && tenantIds.length > 0)
        // already exist
        return;
    }
    return (
      <MenuItem value={tenant._id} key={tenant._id}>
        <Typography variant="caption">{`${tenant.name}`}</Typography>
      </MenuItem>
    );
  };

  render() {
    const {
      dialogTrigger,
      handleAddTenantDialogClose,
      classes,
      app,
      theme,
    } = this.props;
    const { tenants } = app;
    return (
      <Dialog
        open={dialogTrigger}
        onClose={handleAddTenantDialogClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          style={{
            backgroundColor: theme.palette.secondary.dark,
            padding: theme.spacing(1),
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              color: theme.palette.secondary.contrastText,
            }}
          >
            Assign organization
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" className={classes.grid}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="tenant-label">
                <Typography variant="caption">Select organization</Typography>
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
                  ? tenants.map((tenant) => {
                      return this.renderTenant(tenant);
                    })
                  : ""}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddTenantDialogClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.assignUserTenant}
            color="primary"
            variant="outlined"
            size="small"
          >
            <Save fontSize="small" />
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
  dialogTrigger: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(AssignTenantDialog);
