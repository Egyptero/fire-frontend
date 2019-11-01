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
  OutlinedInput
} from "@material-ui/core";
import compareGrade from "../../../../app/compareGrade";
const styles = theme => ({
  content: {
    flexGrow: 1,
    height: "86vh"
  },
  grid: {
    minHeight: "4em",
    minWidth: "16rem"
  },
  gridWithoutBorder: {
    display: "flex",
    position: "relative", //
    height: "79vh",
    maxHeight: "79vh"
  },
  card: {},
  details: {},
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "100%"
  },
  list: {},
  listOrganizations: {},
  listUsers: {}
});

class AddTeamMemberDialog extends Component {
  state = {
    selectedMemberId: "",
    error: ""
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
  onChange = event => {
    this.setState({ selectedMemberId: event.target.value });
  };
  renderTeamMember = user => {
    const { selectedUser } = this.props.source.sourceState;
    //Not under user management
    if (selectedUser._id !== user.managerId) {
      //We need to check that user has higher privilage
      if (compareGrade(selectedUser.role, user.role) === 1)
        return (
          <MenuItem value={user._id} key={user._id}>{`${user.firstname} ${
            user.lastname
          }`}</MenuItem>
        );
    } else return "";
  };

  render() {
    const {
      dialogTrigger,
      handleAddMemberDialogClose,
      classes,
      app
    } = this.props;
    const { users } = app;
    return (
      <Dialog
        open={dialogTrigger}
        onClose={handleAddMemberDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add user to team</DialogTitle>
        <DialogContent>
          <Grid container direction="column" className={classes.grid}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="user-label">Select user</InputLabel>
              <Select
                value={this.state.selectedMemberId}
                onChange={this.onChange}
                input={
                  <OutlinedInput labelWidth={80} name="user" id="user-label" />
                }
              >
                {users
                  ? users.map(user => {
                      return this.renderTeamMember(user);
                    })
                  : ""}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddMemberDialogClose} color="secondary">
            Cancel
          </Button>
          <Button color="secondary" onClick={this.addUserTeamMember}>
            Update
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
  dialogTrigger: PropTypes.bool.isRequired
};

export default withStyles(styles, { withTheme: true })(AddTeamMemberDialog);
