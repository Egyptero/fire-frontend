import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Fab,
  Link,
  Checkbox
} from "@material-ui/core";
import register from "./register";

const styles = theme => ({
  card: {},
  registerCard: {
    paddingLeft: "3em",
    paddingRight: "3em",
    maxWidth: "40em"
  }
});

class CreateAccount extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    sendUpdates: true
  };
  handleDataChange = event => {
    if (event.target.id === "firstname")
      this.setState({ firstname: event.target.value });
    else if (event.target.id === "lastname")
      this.setState({ lastname: event.target.value });
    else if (event.target.id === "username")
      this.setState({ username: event.target.value });
    else if (event.target.id === "email")
      this.setState({ email: event.target.value });
    else if (event.target.id === "password")
      this.setState({ password: event.target.value });
    else if (event.target.id === "confirmPassword")
      this.setState({ confirmPassword: event.target.value });
    else if (event.target.id === "sendUpdates")
      this.setState({ sendUpdates: event.target.checked });
  };
  handleAddUser = () => {
    let user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      receiveUpdates: this.state.sendUpdates
    };
    register(user, this);
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
                  <Typography variant="h5">Create Account</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="subtitle1">
                    Already have an account?{" "}
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
              {/** First name */}
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  onChange={this.handleDataChange}
                  id="firstname"
                  label="First Name"
                  placeholder=""
                  value={this.state.firstname}
                  fullWidth
                  required
                />
              </Grid>
              {/** Last name */}
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  onChange={this.handleDataChange}
                  id="lastname"
                  label="Last Name"
                  placeholder=""
                  value={this.state.lastname}
                  fullWidth
                  required
                />
              </Grid>
              {/** User name */}
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  onChange={this.handleDataChange}
                  id="username"
                  label="User Name"
                  placeholder=""
                  value={this.state.username}
                  fullWidth
                  required
                />
              </Grid>
              {/** Password */}
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  onChange={this.handleDataChange}
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Min 8 characters"
                  value={this.state.password}
                  fullWidth
                  required
                />
              </Grid>
              {/** Confirm Password */}
              <Grid item xs={12}>
                <TextField
                  error={this.state.password !== this.state.confirmPassword}
                  margin="dense"
                  onChange={this.handleDataChange}
                  id="confirmPassword"
                  type="password"
                  label="Confirm password"
                  placeholder=""
                  value={this.state.confirmPassword}
                  fullWidth
                  required
                />
              </Grid>
              {/** Email */}
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  onChange={this.handleDataChange}
                  id="email"
                  type="email"
                  label="Email"
                  placeholder=""
                  value={this.state.email}
                  fullWidth
                  required
                />
              </Grid>
              {/** Updates information */}
              <Grid item xs={12}>
                <Checkbox
                  checked={this.state.sendUpdates}
                  onChange={this.handleDataChange}
                  id="sendUpdates"
                />
                <Typography variant="subtitle1" style={{ display: "inline" }}>
                  Send me updates about firemisc promotions, products and
                  services.
                </Typography>
              </Grid>
              {/** Privacy Policy */}
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Typography variant="caption">
                    By clicking Register, I confirm that I have read and agree
                    to the{" "}
                    <Link
                      component="button"
                      variant="caption"
                      //onClick={this.props.handleBackClick}
                    >
                      firemisc Online Privacy Statement
                    </Link>{" "}
                    and the firemisc{" "}
                    <Link
                      component="button"
                      variant="caption"
                      //onClick={this.props.handleBackClick}
                    >
                      Web Site Terms and Conditions.
                    </Link>
                  </Typography>
                </Grid>
              </Grid>

              {/** Register button */}
              <Grid item xs={12}>
                <Grid container alignContent="center" direction="column">
                  <Fab
                    variant="extended"
                    color="primary"
                    onClick={this.handleAddUser}
                    disabled={
                      this.state.email === "" ||
                      this.state.password === "" ||
                      this.state.username === "" ||
                      this.state.firstname === "" ||
                      this.state.lastname === ""
                    }
                    style={{
                      //width: "50%",
                      marginTop: "4vh",
                      textTransform: "none"
                      //marginBottom: "8vh"
                    }}
                  >
                    Register
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

CreateAccount.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CreateAccount);
