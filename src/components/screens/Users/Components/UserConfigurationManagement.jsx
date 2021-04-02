import React, { Component } from "react";
import {
  Grid,
  Card,
  Divider,
  FormControl,
  TextField,
  FormControlLabel,
  Typography,
  Switch,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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

class UserConfigurationManagement extends Component {
  state = {};
  render() {
    const { classes, source, app, theme } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Capacity of interactions per user */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="interactionCapacity"
                  label="Interaction capacity"
                  placeholder="5"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.interactionCapacity
                      ? source.sourceState.selectedUser.interactionCapacity
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
              {/* Capacity of interactions per user */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="caseCapacity"
                  label="Case capacity"
                  placeholder="5"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.caseCapacity
                      ? source.sourceState.selectedUser.caseCapacity
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Offer timeout in case of manaual answer */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="offerTimeout"
                  label="Offer timeout"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.offerTimeout
                      ? source.sourceState.selectedUser.offerTimeout
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
              {/* Wrap up timeout in case of manaual answer */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="wrapupTimeout"
                  label="Wrapup timeout"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.wrapupTimeout
                      ? source.sourceState.selectedUser.wrapupTimeout
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Daily interaction target */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="dailyInteractionTarget"
                  label="Daily interaction target"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.dailyInteractionTarget
                      ? source.sourceState.selectedUser.dailyInteractionTarget
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
              {/* Daily cases target */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="dailyCaseTarget"
                  label="Daily case target"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.dailyCaseTarget
                      ? source.sourceState.selectedUser.dailyCaseTarget
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
              {/* Daily Utilization target */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="DailyUtilizationTarget"
                  label="Daily utilization target"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.dailyUtilizationTarget
                      ? source.sourceState.selectedUser.dailyUtilizationTarget
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Offline ASA target */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="offlineASATarget"
                  label="Offline channels ASA"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.offlineASATarget
                      ? source.sourceState.selectedUser.offlineASATarget
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
              {/* Online ASA target */}
              <FormControl className={classes.formControl} size="small">
                <TextField
                  name="onlineASATarget"
                  label="Online channels ASA"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  //              onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.onlineASATarget
                      ? source.sourceState.selectedUser.onlineASATarget
                      : ""
                  }
                  fullWidth
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </FormControl>
              {/* Extra KPIs buttons */}
              <FormControl className={classes.formControl} size="small">
                <Button
                  variant="outlined"
                  color="secondary"
                  type="More KPIs"
                  disabled={!source.sourceState.canSave}
                  //onClick={this.handlePasswordDialogOpen}
                  size="small"
                  style={{ textTransform: "none",marginTop:theme.spacing(2) }}
                >
                  <Typography variant="caption">More KPIs</Typography>
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

UserConfigurationManagement.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  UserConfigurationManagement
);
