import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Component } from "react";
const styles = (theme) => ({
  content: {
    flexGrow: 1,
    height: "86vh",
  },
  grid: {
    display: "flex",
    position: "relative",
    maxHeight: "100%",
    minHeight: "100%",
    overflow: "hidden",
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh",
  },
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%",
  },
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class ChangePasswordDialog extends Component {
  state = {
    password: "",
    passwordConfirm: "",
    error: "",
  };
  componentDidUpdate(prevProps, prevState) {
    const { dialogTrigger } = this.props;
    if (dialogTrigger !== prevProps.dialogTrigger)
      this.setState({ password: "", passwordConfirm: "", error: "" });
  }
  onTextChange = (event) => {
    if (event.target.name === "password") {
      this.setState({ password: event.target.value });
      if (this.state.passwordConfirm === event.target.value)
        this.setState({ error: "" });
      else {
        if (this.state.passwordConfirm !== "")
          this.setState({ error: "Password does not match!" });
      }
    }
    if (event.target.name === "passwordConfirm") {
      this.setState({ passwordConfirm: event.target.value });
      if (this.state.password === event.target.value)
        this.setState({ error: "" });
      else this.setState({ error: "Password does not match!" });
    }
  };
  changeUserPassword = () => {
    const { changePassword, handlePasswordDialogClose } = this.props;
    if (this.state.error === "" && this.state.password) {
      changePassword(this.state.password);
      handlePasswordDialogClose();
    }
  };
  render() {
    const { dialogTrigger, handlePasswordDialogClose, classes } = this.props;
    return (
      <Dialog
        open={dialogTrigger}
        onClose={handlePasswordDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <FormControl className={classes.formControl}>
              <TextField
                label="New password"
                value={this.state.password}
                placeholder="New password"
                onChange={this.onTextChange}
                name="password"
                variant="outlined"
                type="password"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="Confirm new password"
                value={this.state.passwordConfirm}
                placeholder="Confirm new password"
                onChange={this.onTextChange}
                name="passwordConfirm"
                variant="outlined"
                type="password"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Typography variant="caption">{this.state.error}</Typography>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.changeUserPassword}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ChangePasswordDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  handlePasswordDialogClose: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  dialogTrigger: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(ChangePasswordDialog);
