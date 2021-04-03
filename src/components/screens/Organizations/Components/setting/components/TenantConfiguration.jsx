import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
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
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class TenantConfiguration extends Component {
  state = {};
  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = source.sourceState;
    if (tenant == null) return <React.Fragment />;

    return (
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ boxShadow: "none`" }}
        >
          <Typography variant="caption">
            <b>Tenant configuration</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container>
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
              <Typography variant="caption">Manage Adninistrators</Typography>
            </Button>
          </FormControl>
          </Grid>
          <Grid container direction="row-reverse">
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
              <Typography variant="caption">Delete organization</Typography>
            </Button>
          </FormControl>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
}

TenantConfiguration.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TenantConfiguration);
