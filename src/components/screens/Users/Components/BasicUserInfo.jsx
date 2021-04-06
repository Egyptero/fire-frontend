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
  Checkbox,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ChangePasswordDialog from "./ChangePasswordDialog";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(0),
    padding: theme.spacing(0), // * 0.2,
    maxWidth: "90%",
  },
  switch: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
  },
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class BasicUserInfo extends Component {
  state = {};

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
    if (event.target.name === "manager")
      selectedUser.managerId = event.target.value;
    if (event.target.name === "notifications")
      selectedUser.notifications = event.target.checked;
    if (event.target.name === "autoAccept")
      selectedUser.autoAccept = event.target.checked;
    if (event.target.name === "wrapup")
      selectedUser.wrapup = event.target.checked;
    if (event.target.name === "workbin")
      selectedUser.workbin = event.target.checked;
    if (event.target.name === "autoLogin")
      selectedUser.autoLogin = event.target.checked;
    if (event.target.name === "overrideUserConf")
      selectedUser.overrideUserConf = event.target.checked;
    if (event.target.name === "overrideKPIsConf")
      selectedUser.overrideKPIsConf = event.target.checked;

    source.updateSelectedUser(selectedUser);
  };

  render() {
    const { classes, source, theme } = this.props;
    return (
      <Grid container>
        {/* Empty space*/}
        {/* <Grid item xs={12}>
          <p style={{ margin: theme.spacing(1) }} />
        </Grid> */}
        {/* User profile pic , change photo button */}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid
            container
            alignItems="center"
            alignContent="center"
            justify="center"
            direction="column"
          >
            <FormControl className={classes.formControl}>
              <Avatar
                src="/imgs/nopic.jpg"
                //
                style={{ width: theme.spacing(20), height: theme.spacing(20) }}
                //
              />
            </FormControl>
            {/* User Change Photo Button */}
            <FormControl className={classes.formControl} size="small">
              <Button
                //variant="contained"
                color="secondary"
                type="Change photo"
                disabled={!source.sourceState.canSave}
                //                onClick={this.handlePasswordDialogOpen}
                size="small"
                style={{ textTransform: "none" }}
              >
                <Typography variant="caption">Change photo</Typography>
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        {/*First Name , Last Name , user name , Email*/}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid
            container
            direction="column"
            style={{
              // border: "1px solid",
              // borderColor: theme.palette.secondary.light,
              // "border-radius": "5px",
              padding: theme.spacing(1),
            }}
          >
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
        {/* User SIP Uri , SIP Server , SIP User name , SIP password*/}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid
            container
            direction="column"
            style={{
              padding: theme.spacing(1),
            }}
          >
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
        {/*  User Role , phone on/off , shared on/off , ODI on/off*/}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="column">
            {/* User role select field */}
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
            {/* User Manager */}
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="manager-label">
                <Typography variant="caption">Manager</Typography>
              </InputLabel>
              <Select
                value={
                  source.sourceState.selectedUser.managerId
                    ? source.sourceState.selectedUser.managerId
                    : ""
                }
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                input={
                  <OutlinedInput
                    labelWidth={80}
                    name="manager"
                    id="manager-label"
                  />
                }
              >
                <MenuItem key="Empty-Manager" value="">
                  {""}
                </MenuItem>
                {this.props.app.users
                  ? this.props.app.users.map((user) => {
                      if (user.role !== "Agent" && user.role !== "User")
                        // You are signed in as agent
                        return (
                          <MenuItem key={user._id} value={user._id}>
                            <Typography variant="caption">{`${user.firstname} ${user.lastname}`}</Typography>
                          </MenuItem>
                        );

                      return "";
                    })
                  : ""}
              </Select>
            </FormControl>

            {/* User controls (ODI , PHONE , FreeLancer , AUTO ODI , TIMEOUT) */}
            <Grid container direction="row">
              {/* phone on/off , ODI on/off , ODI Auto login */}
              <Grid item container direction="column" xs={6}>
                {/* User ODI , Wrapup Option*/}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.odi}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="odi"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={<Typography variant="caption">ODI</Typography>}
                  />
                </FormControl>
                {/* User Phone */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.phone}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="phone"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={<Typography variant="caption">Phone</Typography>}
                  />
                </FormControl>
                {/* Auto login */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.autoLogin}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="autoLogin"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={
                      <Typography variant="caption">Auto login</Typography>
                    }
                  />
                </FormControl>
                {/* Work bin */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.workbin}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="workbin"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={<Typography variant="caption">Workbin</Typography>}
                  />
                </FormControl>
                {/* Override user config on Org config */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          source.sourceState.selectedUser.overrideUserConf
                        }
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="overrideUserConf"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={
                      <Typography variant="caption">Override user</Typography>
                    }
                  />
                </FormControl>
              </Grid>
              {/* , Wrap up on/off , Freelander on/off , Auto accept*/}
              <Grid item container direction="column" xs={6}>
                {/* Wrap up time option */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.wrapup}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="wrapup"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={<Typography variant="caption">Wrap up</Typography>}
                  />
                </FormControl>
                {/* User Freelancer */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.sharedAgent}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="sharedAgent"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={<Typography variant="caption">Freelance</Typography>}
                  />
                </FormControl>
                {/* Auto accept feature */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.autoAccept}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="autoAccept"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={
                      <Typography variant="caption">Auto accept</Typography>
                    }
                  />
                </FormControl>
                {/* Notify feature */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={source.sourceState.selectedUser.notifications}
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="notifications"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={
                      <Typography variant="caption">Notifications</Typography>
                    }
                  />
                </FormControl>
                {/* Override user KPIs */}
                <FormControl className={classes.formControl} size="small">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          source.sourceState.selectedUser.overrideKPIsConf
                        }
                        onChange={this.onDataChange}
                        disabled={!source.sourceState.canSave}
                        color="primary"
                        name="overrideKPIsConf"
                        size="small"
                        className={classes.switch}
                      />
                    }
                    label={
                      <Typography variant="caption">Override KPIs</Typography>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
