import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Link } from "@material-ui/core";
import resetpassword from "./resetpassword";

const styles = theme => ({
  card: {},
  registerCard: {
    paddingLeft: "3em",
    paddingRight: "3em",
    maxWidth: "40em"
  }
});

class PasswordReset extends Component {
  state = {};
  componentDidMount() {
    this.sendPasswordResetEmail();
  }
  sendPasswordResetEmail = event => {
    if (event) event.preventDefault();
    resetpassword(this, this.props.email);
  };
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
                    height={theme.spacing(10)}
                    width={theme.spacing(16)}
                  />
                </Grid>
              </Grid>
              {/**Welcome Message */}
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="h5">Password Reset</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="subtitle1">
                    Password reset instructions sent to your email address{" "}
                    {this.props.email}.If you did not receive the email ,{" "}
                    <Link
                      component="button"
                      variant="subtitle1"
                      onClick={this.sendPasswordResetEmail}
                    >
                      click here to resend
                    </Link>{" "}
                    or{" "}
                    <Link
                      component="button"
                      variant="subtitle1"
                      onClick={this.props.handleBackClick}
                    >
                      Sign in
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

PasswordReset.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PasswordReset);
