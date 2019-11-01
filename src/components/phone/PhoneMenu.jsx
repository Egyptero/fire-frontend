import React, { Component } from "react";
import {
  Grid,
  Popover,
  TextField,
  Typography,
  Fab,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import styles from "../primaryapp/appStyles";
import { Call, Videocam } from "@material-ui/icons";

class PhoneMenu extends Component {
  state = {
    dialnumber: ""
  };
  updateDialNumber = (event, key) => {
    if (event.target.name === "dialnumber")
      this.setState({ dialnumber: event.target.value });
    switch (key) {
      case "key0":
        this.setState({ dialnumber: this.state.dialnumber + "0" });
        break;
      case "key1":
        this.setState({ dialnumber: this.state.dialnumber + "1" });
        break;
      case "key2":
        this.setState({ dialnumber: this.state.dialnumber + "2" });
        break;
      case "key3":
        this.setState({ dialnumber: this.state.dialnumber + "3" });
        break;
      case "key4":
        this.setState({ dialnumber: this.state.dialnumber + "4" });
        break;
      case "key5":
        this.setState({ dialnumber: this.state.dialnumber + "5" });
        break;
      case "key6":
        this.setState({ dialnumber: this.state.dialnumber + "6" });
        break;
      case "key7":
        this.setState({ dialnumber: this.state.dialnumber + "7" });
        break;
      case "key8":
        this.setState({ dialnumber: this.state.dialnumber + "8" });
        break;
      case "key9":
        this.setState({ dialnumber: this.state.dialnumber + "9" });
        break;
      case "key*":
        this.setState({ dialnumber: this.state.dialnumber + "*" });
        break;
      case "key#":
        this.setState({ dialnumber: this.state.dialnumber + "#" });
        break;
      default:
        break;
    }
  };
  handleMakeVoiceCall = () => {
    const { app, handlePhoneMenuClose } = this.props;
    app.handleMakeVoiceCall(this.state.dialnumber);
    handlePhoneMenuClose();
  };
  handleMakeVideoCall = () => {
    const { app, handlePhoneMenuClose } = this.props;
    app.handleMakeVideoCall(this.state.dialnumber);
    handlePhoneMenuClose();
  };
  render() {
    const { anchorEl, handlePhoneMenuClose, theme } = this.props;
    return (
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(anchorEl)}
        onClose={handlePhoneMenuClose}
      >
        <Grid container direction="column">
          <Grid container direction="row" justify="center">
            <TextField
              name="dialnumber"
              value={this.state.dialnumber}
              onChange={this.updateDialNumber}
              style={{
                margin: theme.spacing(2)
              }}
              placeholder="Number to dial"
            />
          </Grid>
          <Grid container direction="row" justify="center">
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key1");
              }}
            >
              <Typography variant="h6">1</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key2");
              }}
            >
              <Typography variant="h6">2</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key3");
              }}
            >
              <Typography variant="h6">3</Typography>
            </Fab>
          </Grid>
          <Grid container direction="row" justify="center">
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key4");
              }}
            >
              <Typography variant="h6">4</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key5");
              }}
            >
              <Typography variant="h6">5</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key6");
              }}
            >
              <Typography variant="h6">6</Typography>
            </Fab>
          </Grid>
          <Grid container direction="row" justify="center">
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key7");
              }}
            >
              <Typography variant="h6">7</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key8");
              }}
            >
              <Typography variant="h6">8</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key9");
              }}
            >
              <Typography variant="h6">9</Typography>
            </Fab>
          </Grid>
          <Grid container direction="row" justify="center">
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key*");
              }}
            >
              <Typography variant="h6">*</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key0");
              }}
            >
              <Typography variant="h6">0</Typography>
            </Fab>
            <Fab
              size="medium"
              style={{ margin: theme.spacing(0.5), boxShadow: "none" }}
              onClick={event => {
                this.updateDialNumber(event, "key#");
              }}
            >
              <Typography variant="h6">#</Typography>
            </Fab>
          </Grid>
          <Grid container direction="row" justify="center">
            <Grid item xs={6}>
              <Grid container direction="row" justify="center">
                <Button
                  color="primary"
                  style={{ margin: theme.spacing() }}
                  onClick={this.handleMakeVoiceCall}
                  disabled={!this.state.dialnumber}
                >
                  <Call />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justify="center">
                <Button
                  color="primary"
                  style={{ margin: theme.spacing() }}
                  onClick={this.handleMakeVideoCall}
                  disabled={!this.state.dialnumber}
                >
                  <Videocam />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    );
  }
}

PhoneMenu.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PhoneMenu);
