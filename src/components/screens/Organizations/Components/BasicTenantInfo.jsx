import React, { Component } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Select,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
    height: "83vh",
    maxHeight: "83vh",
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
    height: "83vh",
    maxHeight: "83vh",
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
    margin: theme.spacing(1),
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

class BasicTenantInfo extends Component {
  state = {};
  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  onDataChange = (event) => {
    let { tenant } = this.props.source.sourceState;
    if (event.target.name === "name") tenant.name = event.target.value;
    if (event.target.name === "legalName")
      tenant.legalName = event.target.value;
    if (event.target.name === "email") tenant.email = event.target.value;
    if (event.target.name === "phone") tenant.phone = event.target.value;
    if (event.target.name === "website") tenant.website = event.target.value;
    if (event.target.name === "mobile") tenant.mobile = event.target.value;
    this.props.source.updateTenantOnChange(tenant);
  };
  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (tenant == null) return <React.Fragment />;
    else
      return (
        <React.Fragment>
          {/* Empty space*/}
          <Grid item xs={12}>
            <p style={{ margin: theme.spacing(1) }} />
          </Grid>
          {/* Tenant profile pic */}
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Grid container justify="center">
              <FormControl className={classes.formControl}>
                <Avatar
                  src="/imgs/nopic.jpg"
                  style={{
                    width: theme.spacing(12),
                    height: theme.spacing(12),
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* Tenant Verification Status*/}
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Grid container direction="column">
              {/* Tenant Verification Status */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="verified"
                  label="Verified"
                  placeholder="Organization verification status"
                  disabled
                  onChange={this.onDataChange}
                  value={tenant.verified ? "Verified" : "Not yet"}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* Organization status*/}
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Grid container direction="column">
              {/* Organization status */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="status"
                  label="Status"
                  placeholder="Organization subscription status"
                  disabled
                  onChange={this.onDataChange}
                  value={tenant.status ? tenant.status : ""}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
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
                size="small"
              >
                <InputLabel htmlFor="role-label">
                  <Typography variant="caption">Your role</Typography>
                </InputLabel>
                <Select
                  value={this.props.app.user.role}
                  onChange={this.onDataChange}
                  disabled
                  input={
                    <OutlinedInput
                      labelWidth={40}
                      name="role"
                      id="role-label"
                    />
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
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="name"
                  label="Business name"
                  placeholder="Business name"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={tenant.name}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  //variant="outlined"
                />
              </FormControl>
              {/* Tenant Email */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="email"
                  label="Business email"
                  placeholder="Business offical email"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={tenant.email}
                  type="Email"
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  //variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* Group Legal Name , Business Phone */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Grid container direction="column">
              {/* Legal Name */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="legalName"
                  label="Legal business name"
                  placeholder="Legal business name"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={tenant.legalName}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  //variant="outlined"
                />
              </FormControl>
              {/* Business Phone */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="phone"
                  label="Business phone"
                  placeholder="Business phone number"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={tenant.phone}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  //variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* Website , Business Mobile */}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Grid container direction="column">
              {/* Website */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="website"
                  label="Website"
                  placeholder="Business website"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={tenant.website ? tenant.website : ""}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  //variant="outlined"
                />
              </FormControl>
              {/* Business Mobile */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="mobile"
                  label="Business mobile"
                  placeholder="Business mobile number"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={tenant.mobile ? tenant.mobile : ""}
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                  //variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* Group tenant admin*/}
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <Grid container direction="column">
              {/* tenant admin */}
              <FormControl className={classes.formControl} size="small">
                <Button
                  variant="contained"
                  color="secondary"
                  type="Tenant admin"
                  disabled={!source.sourceState.canSave}
                  style={{ textTransform: "none" }}
                  //  onClick={this.handlePasswordDialogOpen}
                >
                  <Typography variant="caption">Manage Adnin</Typography>
                </Button>
              </FormControl>
              <Grid container direction="column">
                {/* Delete Organization */}
                <FormControl className={classes.formControl} size="small">
                  <Button
                    variant="outlined"
                    color="primary"
                    type="Delete organization"
                    disabled={!source.sourceState.canSave}
                    onClick={source.deleteTenant}
                    style={{ textTransform: "none" }}
                  >
                    <Typography variant="caption">
                      Delete organization
                    </Typography>
                  </Button>
                </FormControl>
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
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(BasicTenantInfo);
