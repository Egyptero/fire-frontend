import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Typography,
  TextField,
  Button,
  CardHeader,
  CardContent,
  Fab,
} from "@material-ui/core";
import auth from "./home/auth";
import CreateAccount from "./home/CreateAccount";
import VerifyAccount from "./home/VerifyAccount";
import SuspendAccount from "./home/SuspendAccount";
import InactiveAccount from "./home/InactiveAccount";
import ArchivedAccount from "./home/ArchivedAccount";
import PasswordReset from "./home/PasswordReset";
import EmailReset from "./home/EmailReset";

const styles = (theme) => ({
  card: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    maxWidth: "23em",
    maxHeight: "25em",
  },
});

class Home extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    step: 1,
    //Step 0 Register implemented
    //Step 1 Login implemented
    //Step 2 Sign in implemented
    //Step 3 Verify implemented
    //Step 4 Inactive implemented
    //Step 5 Suspended implemented
    //Step 6 Archived implemented
    //Step 7 Password Reset
    //Step 8 Email Reset
    //Step 9 Privacy Policy
    //Step 10 Terms and Conditions
  };

  handleEnterPressInEmail = (event) => {
    if (event.keyCode == 13) this.handleNextClick(event);
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handleEnterKey = (event) => {
    if (event.keyCode == 13) this.handleLoginClick(event);
  };
  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleNextClick = (event) => {
    if (event) event.preventDefault();
    this.setState({ step: 2 });
  };
  handleBackClick = (event) => {
    if (event) event.preventDefault();
    this.setState({ step: 1 });
  };
  handleVerifyRequest = () => {
    this.setState({ step: 3 });
  };
  handleSuspendRequest = () => {
    this.setState({ step: 5 });
  };
  handleInactiveRequest = () => {
    this.setState({ step: 4 });
  };
  handleArchivedRequest = () => {
    this.setState({ step: 6 });
  };
  handlePasswordResetRequest = () => {
    this.setState({ step: 7 });
  };
  handleEmailResetRequest = () => {
    this.setState({ step: 8 });
  };
  handleRegisterClick = (event) => {
    event.preventDefault();
    this.setState({ step: 0 });
  };
  handleLoginClick = (event) => {
    event.preventDefault();
    auth(this);
  };
  renderInactiveStepFour = () => {
    return (
      <InactiveAccount {...this.props} handleBackClick={this.handleBackClick} />
    );
  };
  renderArchivedStepSix = () => {
    return (
      <ArchivedAccount {...this.props} handleBackClick={this.handleBackClick} />
    );
  };
  renderRegisterStepZero = () => {
    return (
      <CreateAccount
        {...this.props}
        handleBackClick={this.handleBackClick}
        handleVerifyRequest={this.handleVerifyRequest}
        handleSuspendRequest={this.handleSuspendRequest}
        handleInactiveRequest={this.handleInactiveRequest}
        handleArchivedRequest={this.handleArchivedRequest}
      />
    );
  };
  renderVerifyStepThree = () => {
    return (
      <VerifyAccount {...this.props} handleBackClick={this.handleBackClick} />
    );
  };
  renderPasswordResetStepSeven = () => {
    return (
      <PasswordReset
        {...this.props}
        handleBackClick={this.handleBackClick}
        email={this.state.email}
      />
    );
  };
  renderEmailResetStepEight = () => {
    return (
      <EmailReset {...this.props} handleBackClick={this.handleBackClick} />
    );
  };
  renderSuspendStepFive = () => {
    return (
      <SuspendAccount {...this.props} handleBackClick={this.handleBackClick} />
    );
  };
  renderLoginStepTwo = () => {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          title={
            <div>
              <Button
                onClick={this.handleBackClick}
                style={{ textTransform: "none" }}
                size="small"
              >
                Back
              </Button>
            </div>
          }
        />
        <CardContent>
          <Grid container spacing={1} padding={16}>
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
                <Typography variant="subtitle1">Welcome</Typography>
              </Grid>
            </Grid>
            {/** Password parameter */}
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <TextField
                  id="standard-Password"
                  label="Password"
                  autoComplete="password"
                  autoFocus
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  onKeyDown={this.handleEnterKey}
                  type="password"
                  style={{ width: "75%" }}
                  size="small"
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </Grid>
            </Grid>
            {/* <Grid item xs={12}>
              <Grid container justify="flex-end">
                <Button color="secondary">Forget password?</Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>{this.state.error}</Typography>
            </Grid> */}
            {/** Sign in button */}
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={this.handleLoginClick}
                  disabled={this.state.password === ""}
                  style={{
                    width: "40%",
                    marginTop: this.props.theme.spacing(5),
                    marginBottom: this.props.theme.spacing(2),
                    textTransform: "none",
                  }}
                  size="small"
                >
                  <Typography variant="caption">Sign in</Typography>
                </Fab>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <Button
                  onClick={this.handlePasswordResetRequest}
                  style={{
                    width: "40%",
                    //marginBottom: "3vh",
                    textTransform: "none",
                  }}
                  size="small"
                >
                  <Typography variant="caption">Forget password?</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  renderLoginStepOne = () => {
    const { classes, theme } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={1} padding={16}>
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
                <Typography variant="subtitle1">Sign in</Typography>
              </Grid>
            </Grid>
            {/** Email parameter */}
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <TextField
                  id="standard-email"
                  label="Email"
                  autoComplete="username"
                  autoFocus
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  onKeyDown={this.handleEnterPressInEmail}
                  style={{ width: "75%" }}
                  size="small"
                  inputProps={{ style: { fontSize: "0.8rem" } }}
                  InputLabelProps={{ style: { fontSize: "0.8rem" } }}
                />
              </Grid>
            </Grid>
            {/** Next button */}
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <Fab
                  variant="extended"
                  color="primary"
                  onClick={this.handleNextClick}
                  disabled={this.state.email === ""}
                  style={{
                    width: "40%",
                    marginTop: this.props.theme.spacing(5),
                    marginBottom: this.props.theme.spacing(2),
                    textTransform: "none",
                  }}
                  size="small"
                >
                  <Typography variant="caption">Next</Typography>
                </Fab>
              </Grid>
            </Grid>
            {/** Forget email? */}
            {/* <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <Button
                  onClick={this.handleEmailResetRequest}
                  style={{
                    marginBottom: "3vh",
                    textTransform: "none"
                  }}
                >
                  Forget email?
                </Button>
              </Grid>
            </Grid> */}
            {/** Create Account Section */}
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <Typography
                  variant="caption"
                  style={{
                    width: "75%",
                    textAlign: "center",
                    borderBottom: "1px solid #000",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                  }}
                >
                  <span style={{ background: "#fff", padding: "0 10px" }}>
                    New to firemisc?
                  </span>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container alignContent="center" direction="column">
                <Button
                  variant="outlined"
                  onClick={this.handleRegisterClick}
                  style={{
                    width: "40%",
                    borderRadius: "2em",
                    textTransform: "none",
                  }}
                  size="small"
                >
                  <Typography variant="caption">Create Account</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.state.step === 8
          ? this.renderEmailResetStepEight()
          : this.state.step === 7
          ? this.renderPasswordResetStepSeven()
          : this.state.step === 6
          ? this.renderArchivedStepSix()
          : this.state.step === 5
          ? this.renderSuspendStepFive()
          : this.state.step === 4
          ? this.renderInactiveStepFour()
          : this.state.step === 3
          ? this.renderVerifyStepThree()
          : this.state.step === 2
          ? this.renderLoginStepTwo()
          : this.state.step === 1
          ? this.renderLoginStepOne()
          : this.renderRegisterStepZero()}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Home);
