import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";
const styles = (theme) => ({
  content: {},
  grid: {},
  gridWithoutBorder: {},
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
    const {
      dialogTrigger,
      handlePasswordDialogClose,
      classes,
      theme,
    } = this.props;
    return (
      <Dialog
        open={dialogTrigger}
        onClose={handlePasswordDialogClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          style={{
            backgroundColor: theme.palette.secondary.dark,
            padding: theme.spacing(1),
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              color: theme.palette.secondary.contrastText,
            }}
          >
            Change password
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <TextField
                label="New password"
                value={this.state.password}
                placeholder="New password"
                onChange={this.onTextChange}
                name="password"
                variant="outlined"
                type="password"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <TextField
                label="Confirm new password"
                value={this.state.passwordConfirm}
                placeholder="Confirm new password"
                onChange={this.onTextChange}
                name="passwordConfirm"
                variant="outlined"
                type="password"
                inputProps={{ style: { fontSize: "0.8rem" } }}
                InputLabelProps={{ style: { fontSize: "0.8rem" } }}
              />
            </FormControl>
            <FormControl className={classes.formControl} size="small">
              <Typography variant="caption">{this.state.error}</Typography>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePasswordDialogClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.changeUserPassword}
            color="primary"
            variant="outlined"
            size="small"
          >
            <Save fontSize="small" />
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
