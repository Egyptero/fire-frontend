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
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@material-ui/core";
import compareGrade from "../../../../app/compareGrade";
import { Cancel, Save } from "@material-ui/icons";
const styles = (theme) => ({
  content: {},
  grid: {
    minHeight: "4em",
    minWidth: "16rem",
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

class AddTeamMemberDialog extends Component {
  state = {
    selectedMemberId: "",
    error: "",
  };
  componentDidUpdate(prevProps, prevState) {
    const { dialogTrigger } = this.props;
    if (dialogTrigger !== prevProps.dialogTrigger)
      this.setState({ selectedMemberId: "", error: "" });
  }
  addUserTeamMember = () => {
    const { addTeamMember, handleAddMemberDialogClose } = this.props;
    if (this.state.error === "" && this.state.selectedMemberId) {
      addTeamMember(this.state.selectedMemberId);
      handleAddMemberDialogClose();
    }
  };
  onChange = (event) => {
    this.setState({ selectedMemberId: event.target.value });
  };
  renderTeamMember = (user) => {
    const { selectedUser } = this.props.source.sourceState;
    //Not under user management
    if (selectedUser._id !== user.managerId) {
      //We need to check that user has higher privilage
      if (compareGrade(selectedUser.role, user.role) === 1)
        return (
          <MenuItem value={user._id} key={user._id}>
            <Typography variant="caption">{`${user.firstname} ${user.lastname}`}</Typography>
          </MenuItem>
        );
    } else return "";
  };

  render() {
    const {
      dialogTrigger,
      handleAddMemberDialogClose,
      classes,
      app,
      theme,
    } = this.props;
    const { users } = app;
    return (
      <Dialog
        open={dialogTrigger}
        onClose={handleAddMemberDialogClose}
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
            Add user to team
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" className={classes.grid}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
            >
              <InputLabel htmlFor="user-label">
                <Typography variant="caption">Select user</Typography>
              </InputLabel>
              <Select
                value={this.state.selectedMemberId}
                onChange={this.onChange}
                input={
                  <OutlinedInput labelWidth={80} name="user" id="user-label" />
                }
              >
                {users
                  ? users.map((user) => {
                      return this.renderTeamMember(user);
                    })
                  : ""}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddMemberDialogClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            <Cancel fontSize="small" />
          </Button>
          <Button
            onClick={this.addUserTeamMember}
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

AddTeamMemberDialog.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  handleAddMemberDialogClose: PropTypes.func.isRequired,
  addTeamMember: PropTypes.func.isRequired,
  dialogTrigger: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddTeamMemberDialog);
