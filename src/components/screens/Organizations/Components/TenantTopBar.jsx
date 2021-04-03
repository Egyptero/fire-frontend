import React, { Component } from "react";
import { Grid, IconButton, Typography, Avatar, Chip } from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Edit, Visibility, Save } from "@material-ui/icons";

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
    marginLeft: theme.spacing(1),
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

class TenantTopBar extends Component {
  state = {};
  renderAvatar = () => {
    const { classes, theme } = this.props;
    const { tenant } = this.props.app;
    if (tenant.logo)
      return (
        <Avatar
          className={classes.topBarItem}
          src={tenant.pic}
          style={{ width: theme.spacing(4), height: theme.spacing(4) }}
        />
      );
    else
      return (
        <Avatar
          className={classes.topBarItem}
          style={{ width: theme.spacing(4), height: theme.spacing(4) }}
        >
          {tenant.name}
        </Avatar>
      );
  };

  render() {
    const { classes, source, theme } = this.props;
    const { tenant } = this.props.app;
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
                <b>{tenant.name}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="caption"
                inline="true"
                className={classes.topBarItem}
              >
                <b>{tenant.status ? tenant.status : ""}</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <Grid item>
              <Chip
                className={classes.topBarItem}
                avatar={<Avatar>{this.props.app.user.role[0]}</Avatar>}
                label={this.props.app.user.role}
                variant="outlined"
                color="primary"
                size="small"
              />
            </Grid>
            <IconButton
              onClick={source.saveTenant}
              disabled={!source.sourceState.canSave}
              size="small"
            >
              <Save fontSize="small" />
            </IconButton>
            <IconButton
              onClick={source.watchTenant}
              disabled={!source.sourceState.canWatch}
              size="small"
            >
              <Visibility fontSize="small" />
            </IconButton>
            <IconButton
              onClick={source.editTenant}
              disabled={!source.sourceState.canEdit}
              size="small"
            >
              <Edit fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

TenantTopBar.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TenantTopBar);
