import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
class ProjectTypeDetails extends Component {
  state = {};
  render() {
    return (
      <Grid container>
        <AllTypeParameters {...this.props} />
        <StandardTypeKPIs {...this.props} />
      </Grid>
    );
  }
}

ProjectTypeDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProjectTypeDetails);
