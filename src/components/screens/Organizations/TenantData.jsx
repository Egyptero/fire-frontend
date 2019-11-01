import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, TextField, IconButton, Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const styles = theme => ({
  root: {
    display: "flex"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  button: {
    margin: theme.spacing(1)
  }
});

class TenantData extends Component {
  state = {
    disabled: true,
    tenant: null
  };
  componentWillUpdate() {}
  handleTenantEdit = () => {
    this.setState({ disabled: false });
  };

  handleCancelUpdate = () => {
    this.setState({ disabled: true });
    this.props.source.loadTenants();
    const { source, index } = this.props;
    this.setState({
      disabled: true,
      tenant: source.sourceState.tenants[index]
    });
  };
  updateTenantDataField(event, type) {
    let { tenant } = this.state;
    if (!tenant) return;
    if (type === "name") tenant.name = event.target.value;
    if (type === "email") tenant.email = event.target.value;
    this.setState({ tenant });
  }

  handleTenantDelete = () => {
    const { index } = this.props;
    this.props.source.handleDeleteTenant(index);
  };
  handleTenantUpdate = () => {
    const { index } = this.props;
    const { tenant } = this.state;
    this.props.source.handleUpdateTenant(index, {
      name: tenant.name,
      email: tenant.email
    });
  };

  render() {
    if (!this.state.tenant) this.state.tenant = this.props.tenant;
    const { classes } = this.props;
    const { disabled } = this.state;
    if (!this.state.tenant) return;
    return (
      <Grid container spacing={2} padding={16}>
        <Grid item xs={12} md={12} sm={12} lg={12} dir="rtl">
          <IconButton
            className={classes.button}
            aria-label="Edit"
            onClick={() => {
              this.handleTenantEdit();
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            className={classes.button}
            aria-label="Delete"
            onClick={() => {
              this.handleTenantDelete();
            }}
          >
            <Delete />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            label="Name"
            autoFocus
            className={classes.textField}
            value={this.state.tenant.name}
            onChange={e => this.updateTenantDataField(e, "name")}
            disabled={disabled}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            label="Email"
            className={classes.textField}
            value={this.state.tenant.email}
            onChange={e => this.updateTenantDataField(e, "email")}
            disabled={disabled}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={12} dir="rtl" hidden={disabled}>
          <Button
            color="primary"
            onClick={() => {
              this.handleTenantUpdate();
            }}
          >
            Update
          </Button>
          <Button
            color="primary"
            onClick={() => {
              this.handleCancelUpdate();
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
}

TenantData.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TenantData);
