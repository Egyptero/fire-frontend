import React, { Component } from "react";
import { Grid, IconButton, Typography, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Edit, Delete, Visibility, Maximize, Save } from "@material-ui/icons";

const styles = theme => ({
  typography: {
    useNextVariants: true
  },
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {},
  topBar: {
    display: "flex",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "lightgrey",
    height: "6vh",
    maxHeight: "6vh"
  },
  topBarItem: {
    display: "flex",
    position: "relative",
    top: "50%",
    marginLeft: theme.spacing(1),
    "-ms-transform": "translateY(-50%)",
    transform: "translateY(-50%)"
  },
  list: {},
  card: {},
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {}
});

class UserTopBar extends Component {
  state = {};
  renderAvatar = () => {
    const { selectedUser } = this.props.source.sourceState;
    const { classes } = this.props;
    if (selectedUser.pic)
      return <Avatar className={classes.topBarItem} src={selectedUser.pic} />;
    else
      return (
        <Avatar className={classes.topBarItem}>
          {selectedUser.firstname[0]}
        </Avatar>
      );
  };

  render() {
    const { classes, source } = this.props;
    const { sourceState } = source;
    return (
      <React.Fragment>
        <Grid item xs={6} sm={6} className={classes.topBar}>
          <Grid container spacing={0}>
            {/* <Grid item>{this.renderAvatar()}</Grid> */}
            <Grid item>
              <Typography
                variant="h6"
                className={classes.topBarItem}
                color="textPrimary"
                inline="true"
              >
                {`${sourceState.selectedUser.firstname} ${
                  sourceState.selectedUser.lastname
                }`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <IconButton
              onClick={source.saveUser}
              disabled={!source.sourceState.canSave}
            >
              <Save />
            </IconButton>
            <IconButton
              onClick={source.watchUser}
              disabled={!source.sourceState.canWatch}
            >
              <Visibility />
            </IconButton>
            <IconButton
              onClick={source.editUser}
              disabled={!source.sourceState.canEdit}
            >
              <Edit />
            </IconButton>
            <IconButton onClick={source.deleteUser}>
              <Delete />
            </IconButton>
            <IconButton onClick={source.switchDetailsView}>
              <Maximize />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

UserTopBar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserTopBar);
