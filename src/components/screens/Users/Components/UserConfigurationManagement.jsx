import React, { Component } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Input,
  InputLabel,
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
  onDataChange = (event) => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (event.target.name === "interactionCapacity")
      selectedUser.interactionCapacity = event.target.value;
    if (event.target.name === "caseCapacity")
      selectedUser.caseCapacity = event.target.value;
    if (event.target.name === "offerTimeout")
      selectedUser.offerTimeout = event.target.value;
    if (event.target.name === "wrapupTimeout")
      selectedUser.wrapupTimeout = event.target.value;
    if (event.target.name === "dailyInteractionTarget")
      selectedUser.dailyInteractionTarget = event.target.value;
    if (event.target.name === "dailyCaseTarget")
      selectedUser.dailyCaseTarget = event.target.value;
    if (event.target.name === "dailyUtilizationTarget")
      selectedUser.dailyUtilizationTarget = event.target.value;
    if (event.target.name === "offlineASATarget")
      selectedUser.offlineASATarget = event.target.value;
    if (event.target.name === "onlineASATarget")
      selectedUser.onlineASATarget = event.target.value;

    source.updateSelectedUser(selectedUser);
  };

  render() {
    const { classes, source, app, theme } = this.props;
    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Capacity of interactions per user */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">
                    Interaction capacity
                  </Typography>
                </InputLabel>
                <Input
                  name="interactionCapacity"
                  type="number"
                  placeholder="5"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.interactionCapacity
                      ? source.sourceState.selectedUser.interactionCapacity
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Interactions</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Capacity of interactions per user */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">Case capacity</Typography>
                </InputLabel>
                <Input
                  name="caseCapacity"
                  type="number"
                  placeholder="5"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.caseCapacity
                      ? source.sourceState.selectedUser.caseCapacity
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Cases</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Offer timeout in case of manaual answer */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">Offer timeout</Typography>
                </InputLabel>
                <Input
                  name="offerTimeout"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.offerTimeout
                      ? source.sourceState.selectedUser.offerTimeout
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Seconds</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Wrap up timeout in case of manaual answer */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">Wrapup timeout</Typography>
                </InputLabel>

                <Input
                  name="wrapupTimeout"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.wrapupTimeout
                      ? source.sourceState.selectedUser.wrapupTimeout
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Seconds</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Daily interaction target */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">
                    Daily interaction target
                  </Typography>
                </InputLabel>
                <Input
                  name="dailyInteractionTarget"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.dailyInteractionTarget
                      ? source.sourceState.selectedUser.dailyInteractionTarget
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Interactions</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Daily cases target */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">Daily case target</Typography>
                </InputLabel>
                <Input
                  name="dailyCaseTarget"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.dailyCaseTarget
                      ? source.sourceState.selectedUser.dailyCaseTarget
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Cases</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Daily Utilization target */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">
                    Daily utilization target
                  </Typography>
                </InputLabel>
                <Input
                  name="dailyUtilizationTarget"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.dailyUtilizationTarget
                      ? source.sourceState.selectedUser.dailyUtilizationTarget
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">%</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Grid container direction="column">
              {/* Offline ASA target */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">
                    Offline channels ASA
                  </Typography>
                </InputLabel>

                <Input
                  name="offlineASATarget"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.offlineASATarget
                      ? source.sourceState.selectedUser.offlineASATarget
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Seconds</Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* Online ASA target */}
              <FormControl className={classes.formControl} size="small">
                <InputLabel htmlFor="component-helper">
                  <Typography variant="caption">Online channels ASA</Typography>
                </InputLabel>

                <Input
                  name="onlineASATarget"
                  type="number"
                  placeholder="20"
                  disabled={!source.sourceState.canSave}
                  onChange={this.onDataChange}
                  value={
                    source.sourceState.selectedUser.onlineASATarget
                      ? source.sourceState.selectedUser.onlineASATarget
                      : ""
                  }
                  fullWidth
                  inputProps={{
                    style: { fontSize: "0.8rem" },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Typography variant="caption">Seconds</Typography>
                    </InputAdornment>
                  }
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
                  style={{ textTransform: "none", marginTop: theme.spacing(2) }}
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
