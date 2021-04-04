import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
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
  switch: {
    margin: theme.spacing(1) * 0.4,
    padding: theme.spacing(0),
  },

  list: {},
  listOrganizations: {},
  listUsers: {},
});

class UserConfiguration extends Component {
  state = {};
  onDataChange = (event) => {
    let { tenant } = this.props.source.sourceState;
    if (event.target.name === "odi") tenant.odi = event.target.checked;
    if (event.target.name === "voip") tenant.voip = event.target.checked;
    if (event.target.name === "notifications")
      tenant.notifications = event.target.checked;
    if (event.target.name === "autoAccept")
      tenant.autoAccept = event.target.checked;
    if (event.target.name === "wrapup") tenant.wrapup = event.target.checked;
    if (event.target.name === "workbin") tenant.workbin = event.target.checked;
    if (event.target.name === "autoLogin")
      tenant.autoLogin = event.target.checked;

    this.props.source.updateTenantOnChange(tenant);
  };
  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (!tenant) return <React.Fragment />;

    return (
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ boxShadow: "none`" }}
        >
          <Typography variant="caption">
            <b>User default setting</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            {/* phone on/off , ODI on/off  */}
            <Grid item container direction="column" md={3}>
              {/* User ODI*/}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={source.sourceState.tenant.odi}
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
                      checked={source.sourceState.tenant.voip}
                      onChange={this.onDataChange}
                      disabled={!source.sourceState.canSave}
                      color="primary"
                      name="voip"
                      size="small"
                      className={classes.switch}
                    />
                  }
                  label={<Typography variant="caption">Phone</Typography>}
                />
              </FormControl>
            </Grid>
            {/* uto login, workbin */}
            <Grid item container direction="column" md={3}>
              {/* Auto login */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={source.sourceState.tenant.autoLogin}
                      onChange={this.onDataChange}
                      disabled={!source.sourceState.canSave}
                      color="primary"
                      name="autoLogin"
                      size="small"
                      className={classes.switch}
                    />
                  }
                  label={<Typography variant="caption">Auto login</Typography>}
                />
              </FormControl>
              {/* Work bin */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={source.sourceState.tenant.workbin}
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
            </Grid>
            {/* , Wrap up on/off , Freelander on/off*/}
            <Grid item container direction="column" md={3}>
              {/* Wrap up time option */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={source.sourceState.tenant.wrapup}
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
                      checked={source.sourceState.tenant.sharedAgent}
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
            </Grid>
            {/* Auto accept*/}
            <Grid item container direction="column" md={3}>
              {/* Auto accept feature */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={source.sourceState.tenant.autoAccept}
                      onChange={this.onDataChange}
                      disabled={!source.sourceState.canSave}
                      color="primary"
                      name="autoAccept"
                      size="small"
                      className={classes.switch}
                    />
                  }
                  label={<Typography variant="caption">Auto accept</Typography>}
                />
              </FormControl>
              {/* Notify feature */}
              <FormControl className={classes.formControl} size="small">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={source.sourceState.tenant.notifications}
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
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

UserConfiguration.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserConfiguration);
