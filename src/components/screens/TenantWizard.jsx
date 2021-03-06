import React, { Component } from "react";
import { Card, Grid, CardHeader, CardContent } from "@material-ui/core";
//import classNames from 'classnames';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../primaryapp/appStyles";
import ConfigureTenant from "../wizard/ConfigureTenant";

class TenantWizard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.root} container spacing={1}>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardHeader title="New Organization Wizard" />
              <CardContent>
                <ConfigureTenant {...this.props} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

TenantWizard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(TenantWizard);
