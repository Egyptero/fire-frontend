import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography, Link } from "@material-ui/core";

const styles = (theme) => ({
  card: {},
  registerCard: {
    paddingLeft: "3em",
    paddingRight: "3em",
    maxWidth: "40em",
  },
});

class EmailReset extends Component {
  state = {};
  componentDidMount() {
    this.sendEmailResetEmail();
  }
  sendEmailResetEmail = (event) => {
    if (event) event.preventDefault();
    //verify(this);
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
                    //height={theme.spacing(10)}
                    width={"25%"}
                  />
                </Grid>
              </Grid>
              {/**Welcome Message */}
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="subtitle1">Restore Email</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="body">
                    Email address sent to your registered mobile number .If you
                    did not receive the message ,{" "}
                    <Link
                      component="button"
                      variant="body"
                      onClick={this.sendEmailResetEmail}
                    >
                      click here to resend
                    </Link>
                    <Typography variant="body"> or </Typography>
                    <Link
                      component="button"
                      variant="body"
                      onClick={this.props.handleBackClick}
                    >
                      sign in
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

EmailReset.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EmailReset);
