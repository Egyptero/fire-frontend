import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
  Avatar
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden"
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh"
  },
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%"
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
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "90%"
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
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
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
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
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
      height: "0.4em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  }
});

class BasicTenantInfo extends Component {
  state = {
  };
  componentDidMount() {}
  onDataChange = event => {
    const { source } = this.props;
    //let { selectedUser } = source.sourceState;
    let {tenant} = this.props.app;
    if (event.target.name === "name")
      tenant.name = event.target.value;
    // if (event.target.name === "lastname")
    //   tenant.lastname = event.target.value;
    if (event.target.name === "email") tenant.email = event.target.value;
    // if (event.target.name === "username")
    //   tenant.username = event.target.value;
    // if (event.target.name === "sipUserName")
    //   tenant.sipUserName = event.target.value;
    // if (event.target.name === "sipPassword")
    //   tenant.sipPassword = event.target.value;
    // if (event.target.name === "sipServer")
    //   tenant.sipServer = event.target.value;
    // if (event.target.name === "sipUri")
    //   tenant.sipUri = event.target.value;
    // if (event.target.name === "role") tenant.role = event.target.value;
    // if (event.target.name === "sharedAgent")
    //   tenant.sharedAgent = event.target.checked;

//    source.updateSelectedUser(tenant);
  };
  render() {
    const { classes, source, theme } = this.props;
    const {tenant} = this.props.app;
    return (
      <React.Fragment>
        {/* Empty space*/}
        <Grid item xs={12}>
          <p style={{ margin: theme.spacing(1) }} />
        </Grid>
        {/* Tenant profile pic */}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <FormControl className={classes.formControl}>
            <Avatar
              src="/imgs/nopic.jpg"
              style={{ width: "5em", height: "5em" }}
            />
          </FormControl>
        </Grid>
        {/* Tenant Verification Status*/}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* Tenant Verification Status */}
            <FormControl className={classes.formControl}>
              <TextField
                name="verified"
                label="Verified"
                placeholder="Organization verification status"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  tenant.verified
                    ? "Verified"
                    : "Not yet"
                }
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Organization status*/}
        <Grid item xs={6} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* Organization status */}
            <FormControl className={classes.formControl}>
              <TextField
                name="status"
                label="Status"
                placeholder="Organization subscription status"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  tenant.status
                    ? tenant.status
                    : ""
                }
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Your Role*/}
        <Grid item xs={6} sm={5} md={3} lg={3}>
          <Grid container direction="row">
            <FormControl
              variant="outlined"
              className={classes.formControl}
              style={{ width: "100%" }}
            >
              <InputLabel htmlFor="role-label">Your role</InputLabel>
              <Select
                value={this.props.app.user.role}
                onChange={this.onDataChange}
                disabled
                input={
                  <OutlinedInput labelWidth={40} name="role" id="role-label" />
                }
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Agent">Agent</MenuItem>
                <MenuItem value="Supervisor">Supervisor</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Administrator">Administrator</MenuItem>
              </Select>
            </FormControl>
            {/* <FormControl className={classes.formControl}>
              <FormControlLabel
                control={
                  <Switch
//                    checked={source.sourceState.selectedUser.phone}
                    onChange={this.onDataChange}
                    disabled
                    color="primary"
                    name="phone"
                  />
                }
                label="Phone"
              />
            </FormControl> */}
          </Grid>
        </Grid>
        {/* Group Tenant Name , Email */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* Business Name */}
            <FormControl className={classes.formControl}>
              <TextField
                name="name"
                label="Business name"
                placeholder="Business name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={tenant.name}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
            {/* Tenant Email */}
            <FormControl className={classes.formControl}>
              <TextField
                name="email"
                label="Business email"
                placeholder="Business offical email"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={tenant.email}
                type="Email"
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group Legal Name , Business Phone */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* Legal Name */}
            <FormControl className={classes.formControl}>
              <TextField
                name="legalName"
                label="Legal business name"
                placeholder="Legal business name"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={tenant.legalName}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
            {/* Business Phone */}
            <FormControl className={classes.formControl}>
              <TextField
                name="phone"
                label="Business phone"
                placeholder="Business phone number"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={tenant.phone}
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Website , Business Mobile */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* Website */}
            <FormControl className={classes.formControl}>
              <TextField
                name="website"
                label="Website"
                placeholder="Business website"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  tenant.website
                    ? tenant.website
                    : ""
                }
                fullWidth
                //variant="outlined"
              />
            </FormControl>
            {/* Business Mobile */}
            <FormControl className={classes.formControl}>
              <TextField
                name="mobile"
                label="Business mobile"
                placeholder="Business mobile number"
                disabled={!source.sourceState.canSave}
                onChange={this.onDataChange}
                value={
                  tenant.mobile
                    ? tenant.mobile
                    : ""
                }
                fullWidth
                //variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Group Change Password Button , Shared Agent */}
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Grid container direction="column">
            {/* User Change Password Button */}
            {/* <FormControl className={classes.formControl}>
              <Button
                variant="contained"
                color="secondary"
                type="Change password"
                disabled={!source.sourceState.canSave}
                onClick={this.handlePasswordDialogOpen}
              >
                Change password
              </Button>
            </FormControl> */}
            <Grid container direction="row">
              {/* User SharedAgent */}
              {/* <FormControl className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={source.sourceState.selectedUser.sharedAgent}
                      onChange={this.onDataChange}
                      disabled={!source.sourceState.canSave}
                      color="primary"
                      name="sharedAgent"
                    />
                  }
                  label="Shared"
                />
              </FormControl> */}
              {/* User ODI */}
              {/* <FormControl className={classes.formControl}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={source.sourceState.selectedUser.odi}
                      onChange={this.onDataChange}
                      disabled
                      color="primary"
                      name="odi"
                    />
                  }
                  label="ODI"
                />
              </FormControl> */}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

BasicTenantInfo.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BasicTenantInfo);