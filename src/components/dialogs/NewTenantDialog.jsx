import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle
} from "@material-ui/core";

class NewTenant extends Component {
  state = {
    name: "",
    email: ""
  };

  handleDataChange = event => {
    if (event.target.id === "name") this.setState({ name: event.target.value });
    else if (event.target.id === "email")
      this.setState({ email: event.target.value });
  };

  handleAddTenant = () => {
    const { source } = this.props;
    source.handleAddTenant({
      name: this.state.name,
      email: this.state.email
    });
  };

  render() {
    const { source } = this.props;
    const { sourceState, handleNewTenantClose } = source;
    return (
      <Dialog
        open={sourceState.openNewTenant}
        onClose={handleNewTenantClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Organization</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                id="name"
                label="Name"
                value={this.state.name}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="email"
                type="email"
                label="Email"
                value={this.state.email}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewTenantClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleAddTenant} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewTenant;
