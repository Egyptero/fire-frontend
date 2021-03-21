import React from "react";
import { Select, MenuItem, Grid, FormControl, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import loadMyTenants from "../../functions/user/tenant/loadMyTenants";
import styles from "./appStyles";
import CreateOrganizationBtn from "../buttons/createorganization/CreateOrganizationBtn";

class OrganizationSelect extends React.Component {
  state = {};
  componentDidMount() {
    // const { app } = this.props;
    // if (!app.tenants)
    //   loadMyTenants(this, result => {
    //     if (!result.error && result.tenants) {
    //       app.handleTenantsListLoad(result.tenants);
    //       app.handleTenantChange(result.tenants[0]);
    //     }
    //   });
    // else if (app.tenants.length > 0) app.handleTenantChange(app.tenants[0]);
  }
  handleChange = event => {
    const { app } = this.props;
    const selected = app.tenants.filter(
      tenant => tenant._id === event.target.value
    );
    if (selected && selected.length > 0) app.handleTenantChange(selected[0]);
  };
  render() {
    const { classes } = this.props;
    const { app } = this.props;
    if (app.tenants === null) return "";

    return (
      <Grid container>
        <FormControl className={classes.formControl} style={{ width: "100%" }}>
          {app.tenants && app.tenants.length > 0 ? (
            <Select
              value={app.tenant ? app.tenant._id : ""}
              onChange={this.handleChange}
              disableUnderline
              inputProps={{
                classes: {
                  root: classes.whiteColor,
                  icon: classes.icon
                }
              }}
            >
              {app.tenants.map(tenant => (
                <MenuItem value={tenant._id} key={tenant._id}>
                 <Typography variant="caption"> {tenant.name}</Typography>
                </MenuItem>
              ))}
            </Select>
          ) : (
            <CreateOrganizationBtn {...this.props} />
          )}
        </FormControl>
      </Grid>
    );
  }
}

OrganizationSelect.propTypes = {
  // source: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  primaryApp: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(OrganizationSelect);
