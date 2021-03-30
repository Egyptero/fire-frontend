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
import loadSkillgroups from "../../../../functions/tenant/skillgroup/loadSkillgroups";
const styles = (theme) => ({
  content: {},
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
  card: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxHeight: "100%",
    minHeight: "100%",
  },
  details: {
    display: "block",
    position: "absolute",
    overflow: "auto",
    height: "78vh",
    maxHeight: "78vh",
    //    minWidth: "100%",
    whiteSpace: "nowrap",
    //width: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      height: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
      "background-color": "whitesmoke", //"rgba(255,255,255,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    maxWidth: "90%",
  },
  list: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "18em",
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
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "6.2em",
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
  listUsers: {
    width: "100%",
    marginTop: theme.spacing(1),
    border: "1px solid",
    borderColor: theme.palette.secondary.light,
    "border-radius": "5px",
    height: "14.7em",
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
});

class UserSkillManagement extends Component {
  state = {
    selectedOrgSkillId: null,
    selectedUserSkillId: null,
  };
  componentDidMount() {
    const { app } = this.props;
    if (!app.skillgroups) loadSkillgroups(this);
  }
  componentDidUpdate(prevProps, prevState) {
    const { app } = this.props;
    if (!app.skillgroups) loadSkillgroups(this);
  }
  assignSkillToUser = () => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (!selectedUser.skillIds) selectedUser.skillIds = [];
    selectedUser.skillIds.push(this.state.selectedOrgSkillId);
    source.updateSelectedUser(selectedUser);
    this.setState({ selectedOrgSkillId: null });
  };
  removeSkillFromUser = () => {
    const { source } = this.props;
    let { selectedUser } = source.sourceState;
    if (selectedUser.skillIds) {
      const skillIds = _.filter(
        selectedUser.skillIds,
        (skillId) => skillId !== this.state.selectedUserSkillId
      );
      selectedUser.skillIds = skillIds;
      source.updateSelectedUser(selectedUser);
      this.setState({ selectedUserSkillId: null });
    }
  };
  renderUserSkillgroup = (skillId) => {
    const { source, app, theme } = this.props;
    const skillgroups = _.filter(
      app.skillgroups,
      (skillgroup) => skillgroup._id === skillId
    );
    if (skillgroups && skillgroups.length > 0) {
      const skillgroup = skillgroups[0];
      return (
        <ListItem
          disabled={!source.sourceState.canSave}
          selected={skillgroup._id === this.state.selectedUserSkillId}
          style={{ padding: "2%" }}
          key={skillgroup._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ selectedUserSkillId: skillgroup._id });
          }}
          style={{ padding: theme.spacing(1) * 0.2 }}
        >
          <ListItemText
            primary={skillgroup.name}
            primaryTypographyProps={{ variant: "caption" }}
            style={{ padding: theme.spacing(0) }}
          />
          {skillgroup._id === this.state.selectedUserSkillId ? (
            <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
              <Button
                disabled={!source.sourceState.canSave}
                variant="text"
                size="small"
                color="primary"
                onClick={this.removeSkillFromUser}
                style={{textTransform:"none"}}
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
  renderOrganizationSkillgroup = (skillgroup) => {
    const { source, theme } = this.props;
    const { selectedUser } = this.props.source.sourceState;
    let found;
    if (selectedUser.skillIds) {
      found = _.filter(
        selectedUser.skillIds,
        (skillId) => skillId === skillgroup._id
      );
    }
    if (found && found.length > 0) return;
    else
      return (
        <ListItem
          disabled={!source.sourceState.canSave}
          selected={skillgroup._id === this.state.selectedOrgSkillId}
          style={{ padding: "2%" }}
          key={skillgroup._id}
          onClick={() => {
            if (source.sourceState.canSave)
              this.setState({ selectedOrgSkillId: skillgroup._id });
          }}
          style={{ padding: theme.spacing(1) * 0.2 }}
        >
          <ListItemText
            primary={skillgroup.name}
            primaryTypographyProps={{ variant: "caption" }}
            style={{ padding: theme.spacing(0) }}
          />
          {skillgroup._id === this.state.selectedOrgSkillId ? (
            <ListItemSecondaryAction style={{ padding: theme.spacing(0) }}>
              <Button
                disabled={!source.sourceState.canSave}
                variant="text"
                size="small"
                color="primary"
                onClick={this.assignSkillToUser}
                style={{textTransform:"none"}}
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
    const { skillgroups } = app;
    return (
      <React.Fragment>
        {/* Organization skills except those with user */}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">Available skillgroups</Typography>
              </FormLabel>
              <List
                disabled={!source.sourceState.canSave}
                className={classes.list}
                disablePadding
              >
                {skillgroups
                  ? skillgroups.map((skillgroup) => {
                      return this.renderOrganizationSkillgroup(skillgroup);
                    })
                  : ""}
              </List>
            </FormControl>
          </Grid>
        </Grid>
        {/* User skill groups*/}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Grid container direction="column">
            <FormControl className={classes.formControl} size="small">
              <FormLabel disabled={!source.sourceState.canSave}>
                <Typography variant="caption">User skillgroups</Typography>
              </FormLabel>
              <List
                disabled={!source.sourceState.canSave}
                className={classes.list}
                disablePadding
              >
                {source.sourceState.selectedUser.skillIds
                  ? source.sourceState.selectedUser.skillIds.map((skillId) => {
                      return this.renderUserSkillgroup(skillId);
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

UserSkillManagement.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserSkillManagement);
