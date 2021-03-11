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

//import { ExpandMore } from "@material-ui/icons";
//import TenantData from "./TenantData";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  button: {
    margin: theme.spacing(1),
  },
});

class TenantsDetails extends Component {
  render() {
    console.log(
      "============================== Current selected tenant =============================="
    );
    console.log(this.props.app.tenant);
    let { classes, source } = this.props;
    /** Comment line as we do not need source state so far. */
    //    let { sourceState } = source;
    let { tenant } = this.props.app;
    if (!tenant)
      // if (
      //   !sourceState.tenants ||
      //   (sourceState.tenants && sourceState.tenants.length < 1)
      // )
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
            <Grid container spacing={0}>
              {/**Basic User Information like pic , name , email */}
              <BasicTenantInfo {...this.props} />
              {/* Divider */}
              <Grid item xs={12}>
                <Divider style={{ margin: "1%" }} />
              </Grid>
              {/**User skillgroups management where you can assign or remove skill from user */}
              {/* <UserSkillManagement {...this.props} /> */}
              {/** User Team Management */}
              {/* <UserAdvancedManagement {...this.props} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      //////////////////////////////////////
          // <Grid container spacing={1}>
          //   <Grid item xs={12}>
          //     <Typography variant="h4">Organization: {tenant.name}</Typography>
          //   </Grid>
          //   <Grid item xs={12}>
          //     <TenantData
          //       app={this.props.app}
          //       primaryApp={this.props.primaryApp}
          //       enqueueSnackbar={this.props.enqueueSnackbar}
          //       source={this.props.source}
          //       tenant={tenant}
          //       //index={index} we should not send index as we are rendering the selected index.
          //     />
          //   </Grid>
          // </Grid>

          /* Disable old code of multi tenants render 
        
        {sourceState.tenants.map((tenant, index) => {
          return (
            <Accordion key={tenant.name}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography className={classes.heading}>
                  {tenant.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TenantData
                  app={this.props.app}
                  primaryApp={this.props.primaryApp}
                  enqueueSnackbar={this.props.enqueueSnackbar}
                  source={this.props.source}
                  tenant={tenant}
                  index={index}
                />
              </AccordionDetails>
            </Accordion >
          );
        })} */
    );
  }
}
TenantsDetails.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TenantsDetails);
