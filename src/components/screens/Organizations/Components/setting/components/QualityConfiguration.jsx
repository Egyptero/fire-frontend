import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
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
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class QualityConfiguration extends Component {
  state = {};
  onDataChange = (event) => {
    let { tenant } = this.props.source.sourceState;
    if (event.target.name === "interactionCapacity")
      tenant.interactionCapacity = event.target.value;
    if (event.target.name === "caseCapacity")
      tenant.caseCapacity = event.target.value;
    if (event.target.name === "offerTimeout")
      tenant.offerTimeout = event.target.value;
    if (event.target.name === "wrapupTimeout")
      tenant.wrapupTimeout = event.target.value;
    if (event.target.name === "dailyInteractionTarget")
      tenant.dailyInteractionTarget = event.target.value;
    if (event.target.name === "dailyCaseTarget")
      tenant.dailyCaseTarget = event.target.value;
    if (event.target.name === "dailyUtilizationTarget")
      tenant.dailyUtilizationTarget = event.target.value;
    if (event.target.name === "offlineASATarget")
      tenant.offlineASATarget = event.target.value;
    if (event.target.name === "onlineASATarget")
      tenant.onlineASATarget = event.target.value;

    this.props.source.updateTenantOnChange(tenant);
  };

  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (!tenant) return <React.Fragment />;

    return (
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ boxShadow: "none`" }}
        >
          <Typography variant="caption">
            <b>Quality configuration</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} lg={4}>
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
                      source.sourceState.tenant.interactionCapacity
                        ? source.sourceState.tenant.interactionCapacity
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
                      source.sourceState.tenant.caseCapacity
                        ? source.sourceState.tenant.caseCapacity
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
                      source.sourceState.tenant.offerTimeout
                        ? source.sourceState.tenant.offerTimeout
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
                      source.sourceState.tenant.wrapupTimeout
                        ? source.sourceState.tenant.wrapupTimeout
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
            <Grid item xs={12} md={6} lg={4}>
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
                      source.sourceState.tenant.dailyInteractionTarget
                        ? source.sourceState.tenant.dailyInteractionTarget
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
                      source.sourceState.tenant.dailyCaseTarget
                        ? source.sourceState.tenant.dailyCaseTarget
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
                      source.sourceState.tenant.dailyUtilizationTarget
                        ? source.sourceState.tenant.dailyUtilizationTarget
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
            <Grid item xs={12} md={6} lg={4}>
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
                      source.sourceState.tenant.offlineASATarget
                        ? source.sourceState.tenant.offlineASATarget
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
                    <Typography variant="caption">
                      Online channels ASA
                    </Typography>
                  </InputLabel>

                  <Input
                    name="onlineASATarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={
                      source.sourceState.tenant.onlineASATarget
                        ? source.sourceState.tenant.onlineASATarget
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
                    style={{
                      textTransform: "none",
                      marginTop: theme.spacing(2),
                    }}
                  >
                    <Typography variant="caption">More KPIs</Typography>
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

QualityConfiguration.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(QualityConfiguration);
