import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  DialogTitle,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Cancel, Save } from "@material-ui/icons";
const styles = (theme) => ({
  content: {},
  grid: {},
  card: {},
  cardContent: {},
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});

class NewUser extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    role: "User",
  };

  handleDataChange = (event) => {
    if (event.target.id === "firstname")
      this.setState({ firstname: event.target.value });
    else if (event.target.id === "lastname")
      this.setState({ lastname: event.target.value });
    else if (event.target.id === "username")
      this.setState({ username: event.target.value });
    else if (event.target.id === "email")
      this.setState({ email: event.target.value });
    else if (event.target.id === "password")
      this.setState({ password: event.target.value });
    // role case
    else this.setState({ role: event.target.value });
  };

  handleAddUser = () => {
    const { source } = this.props;
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    if (this.props.admin) user.role = this.state.role;
    source.handleAddUser(user);
  };

  renderAdminOptions = () => {
    if (this.props.admin)
      return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <FormControl
              variant="outlined"
              style={{ width: "100%" }}
              size="small"
            >
              <InputLabel htmlFor="role-label">
                <Typography variant="caption">Role</Typography>
              </InputLabel>
              <Select
                value={this.state.role}
                onChange={this.handleDataChange}
                input={
                  <OutlinedInput labelWidth={40} name="role" id="role-label" />
                }
              >
                <MenuItem value="User" key="User">
                  <Typography variant="caption">User</Typography>
                </MenuItem>
                <MenuItem value="Agent" key="Agent">
                  <Typography variant="caption">Agent</Typography>
                </MenuItem>
                <MenuItem value="Supervisor" key="Supervisor">
                  <Typography variant="caption">Supervisor</Typography>
                </MenuItem>
                <MenuItem value="Leader" key="Leader">
                  <Typography variant="caption">Leader</Typography>
                </MenuItem>
                <MenuItem value="Business" key="Business">
                  <Typography variant="caption">Business</Typography>
                </MenuItem>
                <MenuItem value="Administrator" key="Administrator">
                  <Typography variant="caption">Administrator</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      );
    else return;
  };

  render() {
    const { source, app, theme } = this.props;
    const { sourceState, handleNewUserClose } = source;
    const tenantName = app && app.tenant ? app.tenant.name : "FIRE MISC";
    return (
      <Dialog
        open={sourceState.openNewUser}
        onClose={handleNewUserClose}
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
            Register user to <b>{tenantName}</b>
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ padding: theme.spacing(2) }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                autoFocus
                margin="dense"
                onChange={this.handleDataChange}
                id="firstname"
                label="First Name"
                value={this.state.firstname}
                fullWidth
                required
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="lastname"
                label="Last Name"
                value={this.state.lastname}
                fullWidth
                required
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="username"
                label="User Name"
                value={this.state.username}
                fullWidth
                required
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                margin="dense"
                onChange={this.handleDataChange}
                id="password"
                type="password"
                label="Password"
                value={this.state.password}
                fullWidth
                required
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
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
                variant="outlined"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </Grid>
            {this.renderAdminOptions()}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNewUserClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.handleAddUser}
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

NewUser.propTypes = {
  enqueueSnackbar: PropTypes.func,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object,
  primaryApp: PropTypes.object,
  theme: PropTypes.object,
  source: PropTypes.object.isRequired,
  admin: PropTypes.bool,
};
export default withStyles(styles, { withTheme: true })(NewUser);
