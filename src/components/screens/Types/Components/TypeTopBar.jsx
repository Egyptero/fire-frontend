import React, { Component } from "react";
import { Grid, IconButton, Typography, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Edit, Delete, Visibility, Maximize, Save } from "@material-ui/icons";

const styles = (theme) => ({
  typography: {
    useNextVariants: true,
  },
  content: {},
  grid: {},
  gridWithBorder: {},
  gridWithoutBorder: {},
  topBar: {
    display: "flex",
    position: "relative",
    backgroundColor: "lightgrey",
    height: theme.spacing(4),
    maxHeight: theme.spacing(4),
  },
  list: {},
  card: {},
  topBarItem: {
    display: "flex",
    position: "relative",
    top: "50%",
    marginLeft: theme.spacing(1),
    "-ms-transform": "translateY(-50%)",
    transform: "translateY(-50%)",
  },
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});

class TypeTopBar extends Component {
  state = {};
  renderAvatar = () => {
    const { selectedType } = this.props.source.sourceState;
    const { classes } = this.props;
    return (
      <Avatar className={classes.topBarItem}>{selectedType.name[0]}</Avatar>
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
                variant="body2"
                className={classes.topBarItem}
                color="textPrimary"
                inline="true"
              >
                {sourceState.selectedType.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <IconButton
              onClick={source.saveType}
              disabled={!source.sourceState.canSave}
              size="small"
            >
              <Save fontSize="small" />
            </IconButton>
            <IconButton
              onClick={source.watchType}
              disabled={!source.sourceState.canWatch}
              size="small"
            >
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton
              onClick={source.editType}
              disabled={!source.sourceState.canEdit}
              size="small"
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={source.deleteType} size="small">
              <Delete fontSize="small" />
            </IconButton>
            <IconButton onClick={source.switchDetailsView} size="small">
              <Maximize fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

TypeTopBar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TypeTopBar);
