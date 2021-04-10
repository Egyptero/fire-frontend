import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { Component } from "react";
import AllTypeParameters from "./AllTypeParameters";

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

class WABTypeDetails extends Component {
  state = {};
  render() {
    return (
      <Grid container>
        <AllTypeParameters {...this.props} />
        <Accordion
          style={{ width: "100%", boxShadow: "none`" }}
          defaultExpanded={false}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ boxShadow: "none`" }}
          >
            <Typography variant="caption">
              <b>WhatsApp KPIs configuration</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ boxShadow: "none`" }}></AccordionDetails>
        </Accordion>
        <Accordion
          style={{ width: "100%", boxShadow: "none`" }}
          defaultExpanded={false}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ boxShadow: "none`" }}
          >
            <Typography variant="caption">
              <b>WhatsApp setup</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ boxShadow: "none`" }}></AccordionDetails>
        </Accordion>

      </Grid>
    );
  }
}

WABTypeDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WABTypeDetails);
