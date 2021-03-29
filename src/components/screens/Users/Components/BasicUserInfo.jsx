import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Button,
  Select,
  FormControlLabel,
  Switch,
  Avatar,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ChangePasswordDialog from "./ChangePasswordDialog";
const styles = (theme) => ({
  content: {},
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh",
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%",
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "78vh",
    maxHeight: "78vh",
    //    minWidth: "100%",
    whiteSpace: "nowrap",
    //width: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke", //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    margin: theme.spacing(0.2),
    maxWidth: "90%",
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "18em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  listOrganizations: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "6.2em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.dark,
    "border-radius": "5px",
    height: "14.7em",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
});

class BasicUserInfo extends Component {
  state = {
    changePasswordDialog: false,
  };
  componentDidMount() {}
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (event.target.name === "firstname")
      selectedUser.firstname = event.target.value;
    if (event.target.name === "lastname")
      selectedUser.lastname = event.target.value;
    if (event.target.name === "email") selectedUser.email = event.target.value;
    if (event.target.name === "username")
      selectedUser.username = event.target.value;
    if (event.target.name === "sipUserName")
      selectedUser.sipUserName = event.target.value;
    if (event.target.name === "sipPassword")
      selectedUser.sipPassword = event.target.value;
    if (event.target.name === "sipServer")
      selectedUser.sipServer = event.target.value;
    if (event.target.name === "sipUri")
      selectedUser.sipUri = event.target.value;
    if (event.target.name === "role") selectedUser.role = event.target.value;
    if (event.target.name === "sharedAgent")
      selectedUser.sharedAgent = event.target.checked;
    if (event.target.name === "odi") selectedUser.odi = event.target.checked;
    if (event.target.name === "phone")
      selectedUser.phone = event.target.checked;

    source.updateSelectedUser(selectedUser);
  };

  changePassword = (password) => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    selectedUser.password = password;
    source.updateSelectedUser(selectedUser);
  };
  handlePasswordDialogClose = () => {
    this.setState({ changePasswordDialog: false });
  };
  handlePasswordDialogOpen = () => {
    this.setState({ changePasswordDialog: true });
  };

  render() {
    const { classes, source, theme } = this.props;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: theme.spacing(1) }} />
        </Grid>
        {/* User profile pic */}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid container justify="center">
            <FormControl className={classes.formControl}>
              <Avatar
                src="/imgs/nopic.jpg"
                style={{ width: theme.spacing(12), height: theme.spacing(12) }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* User SIP Server*/}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User SIP Server */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="sipServer"
                label="SIP Server"
                placeholder="SIP Server ex(xxx.xxx.xxx.xxx)"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  source.sourceState.selectedUser.sipServer
                    ? source.sourceState.selectedUser.sipServer
                    : ""
                }
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* User SIP Uri*/}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User SIP Uri */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="sipUri"
                label="SIP Uri"
                placeholder="ws://<SIP-Server>:Port/ws"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  source.sourceState.selectedUser.sipUri
                    ? source.sourceState.selectedUser.sipUri
                    : ""
                }
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* User Role*/}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="row">
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ width: "100%" }}
              size="small"
            >
              <InputLabel htmlFor="role-label">
                <Typography variant="caption">Role</Typography>
              </InputLabel>
              <Select
                value={source.sourceState.selectedUser.role}
                onChange={this.onDataChange}
                disabled={!source.sourceState.canSave}
                input={
                  <OutlinedInput labelWidth={40} name="role" id="role-label" />
                }
              >
                <MenuItem value="User">
                  <Typography variant="caption">User</Typography>
                </MenuItem>
                <MenuItem value="Agent">
                  <Typography variant="caption">Agent</Typography>
                </MenuItem>
                <MenuItem value="Supervisor">
                  <Typography variant="caption">Supervisor</Typography>
                </MenuItem>
                <MenuItem value="Business">
                  <Typography variant="caption">Business</Typography>
                </MenuItem>
                <MenuItem value="Administrator">
                  <Typography variant="caption">Administrator</Typography>
                </MenuItem>
              </Select>
            </FormControl>
            {/* User Phone */}
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Switch
                    checked={source.sourceState.selectedUser.phone}
                    onChange={this.onDataChange}
                    disabled={!source.sourceState.canSave}
                    color="primary"
                    name="phone"
                    size="small"
                  />
                }
                label={<Typography variant="caption">Phone</Typography>}
                size="small"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group First Name , Email */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User First Name */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="firstname"
                label="First name"
                placeholder="First name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedUser.firstname}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </FormControl>
            {/* User Email */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="email"
                label="Email"
                placeholder="Email"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedUser.email}
                type="Email"
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group Last Name , User Name */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User Last Name */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="lastname"
                label="Last name"
                placeholder="Last name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedUser.lastname}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </FormControl>
            {/* User User Name */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="username"
                label="User"
                placeholder="User"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={source.sourceState.selectedUser.username}
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* SIP username , SIP password */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User SIP User Name */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="sipUserName"
                label="SIP User name"
                placeholder="SIP User name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  source.sourceState.selectedUser.sipUserName
                    ? source.sourceState.selectedUser.sipUserName
                    : ""
                }
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </FormControl>
            {/* User User Name */}
            <FormControl className={classes.formControl} size="small">
              <TextField
                name="sipPassword"
                label="SIP Password"
                placeholder="SIP Password"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  source.sourceState.selectedUser.sipPassword
                    ? source.sourceState.selectedUser.sipPassword
                    : ""
                }
                fullWidth
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group Change Password Button , Shared Agent */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User Change Password Button */}
            <FormControl className={classes.formControl} size="small">
              <Button
                variant="contained"
                color="secondary"
                type="Change password"
                disabled={!source.sourceState.canSave}
                onClick={this.handlePasswordDialogOpen}
                size="small"
              >
                <Typography variant="caption">Change password</Typography>
              </Button>
            </FormControl>
            <Grid container direction="row">
              {/* User SharedAgent */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Switch
                      checked={source.sourceState.selectedUser.sharedAgent}
                      onChange={this.onDataChange}
                      disabled={!source.sourceState.canSave}
                      color="primary"
                      name="sharedAgent"
                      size="small"
                    />
                  }
                  label={<Typography variant="caption">Shared</Typography>}
                />
              </FormControl>
              {/* User ODI */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Switch
                      checked={source.sourceState.selectedUser.odi}
                      onChange={this.onDataChange}
                      disabled={!source.sourceState.canSave}
                      color="primary"
                      name="odi"
                      size="small"
                    />
                  }
                  label={<Typography variant="caption">ODI</Typography>}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <ChangePasswordDialog
          {...this.props}
          dialogTrigger={this.state.changePasswordDialog}
          changePassword={this.changePassword}
          handlePasswordDialogClose={this.handlePasswordDialogClose}
        />
      </React.Fragment>
    );
  }
}

BasicUserInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicUserInfo);
