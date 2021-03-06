import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Link } from "@material-ui/core";

const styles = theme => ({
  card: {},
  registerCard: {
    paddingLeft: "3em",
    paddingRight: "3em",
    maxWidth: "40em"
  }
});

class SuspendAccount extends Component {
  state = {};
  render() {
    const { classes, theme } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Card className={classes.registerCard}>
          <CardContent>
            <Grid container spacing={0} padding={16}>
              {/** Logo of the platform */}
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <img
                    src="./imgs/firemisc.png"
                    alt="firemisc"
                    //height={theme.spacing(10)}
                    width={"25%"}
                  />
                </Grid>
              </Grid>
              {/**Welcome Message */}
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="subtitle1">Activate Account</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="body">
                    This account is inactive.{" "}
                    <Link
                      component="button"
                      variant="subtitle1"
                      onClick={this.props.handleBackClick}
                    >
                      Click here to activate.
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

SuspendAccount.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SuspendAccount);
