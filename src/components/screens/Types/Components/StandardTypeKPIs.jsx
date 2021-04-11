import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
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

class StandardTypeKPIs extends Component {
  state = {};
  onDataChange = (event) => {
    const { source } = this.props;
    let selectedType = { ...source.sourceState.selectedType };
    let { configuration } = selectedType;
    let { kpis } = configuration ? configuration : {};
    if (!kpis) kpis = {};

    if (event.target.name === "handlingTimeTarget")
      kpis.handlingTimeTarget = event.target.value;
    if (event.target.name === "dailyHitTarget")
      kpis.dailyHitTarget = event.target.value;
    if (event.target.name === "dropTarget")
      kpis.dropTarget = event.target.value;
    if (event.target.name === "channelASATarget")
      kpis.channelASATarget = event.target.value;
    if (event.target.name === "queueTarget")
      kpis.queueTarget = event.target.value;
    if (event.target.name === "queueTimeTarget")
      kpis.queueTimeTarget = event.target.value;

    if (!selectedType.configuration)
      selectedType.configuration = { kpis: {}, params: [] };
    selectedType.configuration.kpis = { ...kpis };
    source.updateSelectedType(selectedType);
  };
  render() {
    const { source, theme, classes } = this.props;
    let configuration = source.sourceState.selectedType.configuration;
    if (!configuration) configuration = { kpis: {} };
    let { kpis } = configuration ? configuration : {};
    if (!kpis) kpis = {};

    return (
      <Accordion
        style={{ width: "100%", boxShadow: "none`" }}
        defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ boxShadow: "none`" }}
        >
          <Typography variant="caption">
            <b>Standard KPIs configuration</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ boxShadow: "none`" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="column">
                {/* Handling time target */}
                <FormControl className={classes.formControl} size="small">
                  <InputLabel htmlFor="component-helper">
                    <Typography variant="caption">Handling time</Typography>
                  </InputLabel>
                  <Input
                    name="handlingTimeTarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={
                      kpis.handlingTimeTarget ? kpis.handlingTimeTarget : ""
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
                {/* Daily cases target */}
                <FormControl className={classes.formControl} size="small">
                  <InputLabel htmlFor="component-helper">
                    <Typography variant="caption">Daily hits</Typography>
                  </InputLabel>
                  <Input
                    name="dailyHitTarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={kpis.dailyHitTarget ? kpis.dailyHitTarget : ""}
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
            <Grid item xs={12} md={6} lg={4}>
              <Grid container direction="column">
                {/* Aban rate */}
                <FormControl className={classes.formControl} size="small">
                  <InputLabel htmlFor="component-helper">
                    <Typography variant="caption">Aban rate</Typography>
                  </InputLabel>
                  <Input
                    name="dropTarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={kpis.dropTarget ? kpis.dropTarget : ""}
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
                {/* ASA target */}
                <FormControl className={classes.formControl} size="small">
                  <InputLabel htmlFor="component-helper">
                    <Typography variant="caption">ASA</Typography>
                  </InputLabel>

                  <Input
                    name="channelASATarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={kpis.channelASATarget ? kpis.channelASATarget : ""}
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
                {/* Queue target */}
                <FormControl className={classes.formControl} size="small">
                  <InputLabel htmlFor="component-helper">
                    <Typography variant="caption">Max in queue</Typography>
                  </InputLabel>
                  <Input
                    name="queueTarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={kpis.queueTarget ? kpis.queueTarget : ""}
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
                {/* Queue time target */}
                <FormControl className={classes.formControl} size="small">
                  <InputLabel htmlFor="component-helper">
                    <Typography variant="caption">Queue time</Typography>
                  </InputLabel>
                  <Input
                    name="queueTimeTarget"
                    type="number"
                    placeholder="20"
                    disabled={!source.sourceState.canSave}
                    onChange={this.onDataChange}
                    value={kpis.queueTimeTarget ? kpis.queueTimeTarget : ""}
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
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

StandardTypeKPIs.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(StandardTypeKPIs);
