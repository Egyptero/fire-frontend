import React, { Component } from "react";
import {
  Grid,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  FormLabel,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import _ from "lodash";
import loadUsers from "../../../../functions/tenant/user/loadUsers";
import updateUser from "../../../../functions/tenant/user/updateUser";
const styles = (theme) => ({
  content: {
  },
  grid: {
  },
  gridWithoutBorder: {
  },
  card: {
  },
  details: {
  },
  formControl: {
    margin: theme.spacing(1),
    //maxWidth: "90%"
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    maxHeight: theme.spacing(24),
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": theme.palette.secondary, //"whitesmoke" //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.secondary.dark, //"rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  listOrganizations: {
  },
  listUsers: {
  },
});

class SkillUsersManagement extends Component {
  state = {
    selectedOrgUserId: null,
    selectedSkillUserId: null,
  };
  componentDidMount() {
    const { app } = this.props;
    if (!app.users) loadUsers(this);
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (!app.users) loadUsers(this);
  }
  assignUserToSkill = () => {
    const { source } = this.props;
    const { selectedSkillgroup } = source.sourceState;
    const { users } = this.props.app;

    let orgUsers = _.filter(
      users,
      (user) => user._id === this.state.selectedOrgUserId
    );
    if (orgUsers && orgUsers.length > 0) {
      let user = orgUsers[0];
      if (!user.skillIds) user.skillIds = [];
      user.skillIds.push(selectedSkillgroup._id);
      updateUser(user._id, _.pick(user, ["skillIds"]), this, (result) => {
        if (!result.error) this.setState({ selectedOrgUserId: null });
      });
    }
  };
  removeUserFromSkill = () => {
    const { source } = this.props;
    const { selectedSkillgroup } = source.sourceState;
    const { users } = this.props.app;

    let skillUsers = _.filter(
      users,
      (user) => user._id === this.state.selectedSkillUserId
    );
    if (skillUsers && skillUsers.length > 0) {
      let user = skillUsers[0];
      if (!user.skillIds) return;

      user.skillIds = _.filter(
        user.skillIds,
        (skillId) => skillId !== selectedSkillgroup._id
      );
      updateUser(user._id, _.pick(user, ["skillIds"]), this, (result) => {
        if (!result.error) this.setState({ selectedSkillUserId: null });
      });
    }
  };
  renderSkillgroupUser = (user) => {
    const { source,theme } = this.props;
    const { selectedSkillgroup } = this.props.source.sourceState;
    let found;
    if (user.skillIds) {
      found = _.filter(
        user.skillIds,
        (skillId) => skillId === selectedSkillgroup._id
      );
    }
    if (found && found.length > 0) {
      return (
        <ListItem
          disabled={!source.sourceState.canSave}
          selected={user._id === this.state.selectedSkillUserId}
          style={{ padding: "2%" }}
          key={user._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ selectedSkillUserId: user._id });
          }}
          style={{padding:theme.spacing(1)}}
        >
          <ListItemText
            primary={`${user.firstname} ${user.lastname}`}
            primaryTypographyProps={{ variant: "small" }}
          />
          {user._id === this.state.selectedSkillUserId ? (
            <ListItemSecondaryAction>
              <Button
                disabled={!source.sourceState.canSave}
                variant="text"
                size="small"
                color="primary"
                onClick={this.removeUserFromSkill}
              >
                <Typography variant="caption">Remove</Typography>
              </Button>
            </ListItemSecondaryAction>
          ) : (
            ""
          )}
        </ListItem>
      );
    } else return;
  };
  renderOrganizationUser = (user) => {
    const { source,theme } = this.props;
    const { selectedSkillgroup } = this.props.source.sourceState;
    let found;
    if (user.skillIds) {
      found = _.filter(
        user.skillIds,
        (skillId) => skillId === selectedSkillgroup._id
      );
    }
    if (found && found.length > 0) return;
    else
      return (
        <ListItem
          disabled={!source.sourceState.canSave}
          selected={user._id === this.state.selectedOrgUserId}
          style={{ padding: "2%" }}
          key={user._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ selectedOrgUserId: user._id });
          }}
          style={{padding:theme.spacing(1)}}
        >
          <ListItemText
            primary={`${user.firstname} ${user.lastname}`}
            primaryTypographyProps={{ variant: "caption" }}
          />
          {user._id === this.state.selectedOrgUserId ? (
            <ListItemSecondaryAction>
              <Button
                disabled={!source.sourceState.canSave}
                variant="text"
                size="small"
                color="primary"
                onClick={this.assignUserToSkill}
              >
                <Typography variant="caption">Assign</Typography>
              </Button>
            </ListItemSecondaryAction>
          ) : (
            ""
          )}
        </ListItem>
      );
  };
  render() {
    const { classes, source, app } = this.props;
    const { users } = app;
    return (
      <React.Fragment>
        {/* Organization userss except those with skill */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Available users</Typography>
              </FormLabel>
              <List
                disabled={!source.sourceState.canSave}
                className={classes.list}
              >
                {users
                  ? users.map((user) => {
                      return this.renderOrganizationUser(user);
                    })
                  : ""}
              </List>
            </FormControl>
          </Grid>
        </Grid>
        {/* Skillgroup users*/}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Users in group</Typography>
              </FormLabel>
              <List
                disabled={!source.sourceState.canSave}
                className={classes.list}
              >
                {users
                  ? users.map((user) => {
                      return this.renderSkillgroupUser(user);
                    })
                  : ""}
              </List>
            </FormControl>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SkillUsersManagement.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SkillUsersManagement);
