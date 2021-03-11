import React, { Component } from "react";
import { Grid, IconButton, Typography, Avatar } from "@material-ui/core";
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
    overflow: "hidden",
    backgroundColor: "lightgrey",
    height: "6vh",
    maxHeight: "6vh",
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
    const { classes } = this.props;
    const { tenant } = this.props.app;
    if (tenant.logo)
      return <Avatar className={classes.topBarItem} src={tenant.pic} />;
    else return <Avatar className={classes.topBarItem}>{tenant.name}</Avatar>;
  };

  render() {
    const { classes, source } = this.props;
    const { sourceState } = source;
    const { tenant } = this.props.app;
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
                {tenant.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.topBar} item xs={6} sm={6}>
          <Grid container justify="flex-end">
            <IconButton
              onClick={source.saveTenant}
              disabled={!source.sourceState.canSave}
            >
              <Save />
            </IconButton>
            <IconButton
              onClick={source.watchTenant}
              disabled={!source.sourceState.canWatch}
            >
              <Visibility />
            </IconButton>
            <IconButton
              onClick={source.editTenant}
              disabled={!source.sourceState.canEdit}
            >
              <Edit />
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
