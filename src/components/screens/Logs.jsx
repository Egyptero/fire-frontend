import React, { Component } from "react";
import { Card, Grid, CardHeader } from "@material-ui/core";
//import classNames from 'classnames';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../primaryapp/appStyles";

class Logs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid className={classes.root} container spacing={1}>
          <Grid item xs={12}>
            <Card className={classes.Card}>
              <CardHeader title="Logs Management" />
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Logs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Logs);
