import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
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

class CustomTypeDetails extends Component {
  state = {};
  render() {
    return (
      <Grid container>
        <AllTypeParameters {...this.props}/>
        <Typography variant="h6">Custom</Typography>
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
