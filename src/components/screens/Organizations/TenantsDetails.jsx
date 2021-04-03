import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
import TenantTopBar from "./Components/TenantTopBar";
import BasicTenantInfo from "./Components/BasicTenantInfo";
import TenantSetting from "./Components/setting/TenantSetting";


//import { ExpandMore } from "@material-ui/icons";
//import TenantData from "./TenantData";

const styles = (theme) => ({
  content: {
  },
  gridWithoutBorder: {},
  gridWithoutBorder: {},
  card: {},
  details: {},
  formControl: {},
  list: {},
  listOrganizations: {},
  listUsers: {},
});

class TenantsDetails extends Component {
  render() {
    let { classes, source } = this.props;
    let { tenant } = this.props.app;
    if (!tenant)
      return (
        <Typography paragraph className={classes.heading}>
          No organizations are registered.
        </Typography>
      );
    return (
      <Grid item xs={12}>
        <Grid
          container
          style={{
            overflow: "auto",
            position: "relative",
            display: "flex",
            background: "transparent",
          }}
        >
          {/** User Topbar running all user capabilities like save , edit , watch */}
          <TenantTopBar {...this.props} />
          {/**User Details part. Having user basic info and skill management , and advanced management */}
          <Grid item xs={12}>
            <Grid container>
              {/**Basic User Information like pic , name , email */}
              <BasicTenantInfo {...this.props} />
              <TenantSetting {...this.props} />
              {/* Divider */}
              {/* <Grid item xs={12}>
                <Divider style={{ margin: "1%" }} />
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
TenantsDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TenantsDetails);
