import {
  Avatar,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {},
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class BasicTenantInfo extends Component {
  state = {};
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
    if (!tenant) return <React.Fragment />;
    else
      return (
        <React.Fragment>
          {/* Tenant basic information */}
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Grid
              container
              direction="column"
              style={{ padding: theme.spacing(2) }}
            >
              <Grid
                container
                alignItems="center"
                alignContent="center"
                justify="center"
                direction="column"
              >
                {/* Tenant Pic */}
                <FormControl className={classes.formControl}>
                  <Avatar
                    //src="/imgs/firemisc.png"
                    //srcSet="/imgs/firemisc.png"
                    //

                    style={{
                      width: theme.spacing(20),
                      height: theme.spacing(20),
                      backgroundColor: theme.palette.common.white,
                    }}
                    //
                  >
                    <img
                      src="/imgs/firemisc.png"
                      style={{
                        width: theme.spacing(20),
                        height: theme.spacing(20),
                      }}
                    />
                  </Avatar>
                </FormControl>
                {/* Change Photo Button */}
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
              {tenant.verified ? (
                <Grid
                  container
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                  direction="column"
                  style={{ padding: theme.spacing(4) }}
                >
                  {/* Tenant Pic */}
                  <FormControl className={classes.formControl}>
                    <img
                      src="/imgs/verified.png"
                      //
                      style={{
                        width: theme.spacing(20),
                        // height: theme.spacing(20),
                      }}
                      //
                    />
                  </FormControl>
                </Grid>
              ) : (
                ""
              )}
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
