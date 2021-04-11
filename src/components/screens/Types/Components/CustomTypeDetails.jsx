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
import AllTypeParameters from "./AllTypeParameters";
import StandardTypeKPIs from "./StandardTypeKPIs";

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

class CustomTypeDetails extends Component {
  state = {};
  render() {
    const { source, theme, classes } = this.props;
    let configuration = source.sourceState.selectedType.configuration;
    if (!configuration) configuration = { kpis: {} };
    let { kpis } = configuration;
    if (!kpis) kpis = {};
    return (
      <Grid container>
        <AllTypeParameters {...this.props} />
        <StandardTypeKPIs {...this.props} />
      </Grid>
    );
  }
}

CustomTypeDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomTypeDetails);
