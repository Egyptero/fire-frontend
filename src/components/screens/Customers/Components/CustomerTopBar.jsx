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
  topBarItem: {
    display: "flex",
    position: "relative",
    top: "50%",
    marginLeft: theme.spacing(),
    "-ms-transform": "translateY(-50%)",
    transform: "translateY(-50%)",
  },
  list: {},
  card: {},
  details: {},
  formControl: {},
  listOrganizations: {},
  listUsers: {},
});

class CustomerTopBar extends Component {
  state = {};
  renderAvatar = () => {
    const { selectedCustomer } = this.props.source.sourceState;
    const { classes } = this.props;
    return (
      <Avatar className={classes.topBarItem}>{selectedCustomer.name[0]}</Avatar>
    );
  };

  render() {
    const { classes, source } = this.props;
    const { sourceState } = source;
    const { selectedCustomer } = sourceState;
    return (
      <React.Fragment>
        <Grid item xs={6} sm={6} className={classes.topBar}>
          <Grid container spacing={0}>
            {/* <Grid item>{this.renderAvatar()}</Grid> */}
            <Grid item>
              <Typography
                variant="body2"
                color="textPrimary"
                className={classes.topBarItem}
                inline="true"
              >
                {`${selectedCustomer.firstname} ${selectedCustomer.lastname}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <IconButton
              onClick={source.saveCustomer}
              disabled={!source.sourceState.canSave}
              size="small"
            >
              <Save fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={source.watchCustomer}
              disabled={!source.sourceState.canWatch}
            >
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={source.editCustomer}
              disabled={!source.sourceState.canEdit}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={source.deleteCustomer} size="small">
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

CustomerTopBar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomerTopBar);
